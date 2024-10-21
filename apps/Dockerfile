ARG node_version
FROM node:${node_version:-lts}

ARG app_root="/home/open-assistant/apps"
ARG user
ARG uid
ARG gid
ARG debug
ARG yarn_version

ENV USER="${user}"
ENV UID="${uid}"
ENV GID="${gid}"
ENV DOCKER_DEBUG="${debug}"
ENV APP_ROOT="${app_root}"

RUN if [ -n "${DOCKER_DEBUG}" ]; then set -eux; fi && \
    groupmod -g 1111 node && usermod -u 1111 -g 1111 node && \
    groupadd -g ${gid} docker && \
    useradd -m -d /home/${user} -u ${uid} -g docker ${user} && \
    chmod 775 /home/${user} && \
    mkdir ${app_root} && \
    chown -R ${user}:docker /usr/local/lib/node_modules /usr/local/bin /usr/local/share && \
    chown ${user}:docker ${app_root}

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    if [ -n "${DOCKER_DEBUG}" ]; then set -eux; fi && \
    apt-get update > /dev/null && \
    if [ -z "${DOCKER_DEBUG}" ]; then apt-get -qy upgrade > /dev/null; fi && \
    apt-get -qy install sudo net-tools > /dev/null && \
    echo "${user}\t\tALL=(ALL:ALL)\tNOPASSWD:ALL" | tee --append /etc/sudoers && \
    if [ -z "${DOCKER_DEBUG}" ]; then apt cache clear > /dev/null; fi

WORKDIR ${app_root}
USER ${user}:docker

COPY . .

RUN if [ -n "${DOCKER_DEBUG}" ]; then set -eux; fi && \
    npm install --no-fund -g npm@latest > /dev/null && \
    npm install --no-fund -g nx > /dev/null && \
    yarn install --frozen-lockfile

#ENTRYPOINT ["nx daemon --start"]
#CMD ["yarn start-all"]
