ARG node_version
FROM node:${node_version:-lts}

ARG app_root
ARG user
ARG uid
ARG gid
ARG debug
ARG yarn_version

ENV USER="${user}"
ENV UID="${uid}"
ENV GID="${gid}"
ENV APP_ROOT="${app_root}"

RUN if [ -n "${debug}" ]; then set -eux; fi && \
    groupmod -g 1111 node && usermod -u 1111 -g 1111 node && \
    groupadd -g ${gid} docker && \
    useradd -m -d /home/${user} -u ${uid} -g docker ${user} && \
    chmod 775 /home/${user} && \
    mkdir -p ${app_root} && \
    chown -R ${user}:docker ${app_root} && \
    chown -R ${user}:docker /usr/local/lib/node_modules /usr/local/bin /usr/local/share

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    if [ -n "${debug}" ]; then set -eux; fi && \
    apt-get update > /dev/null && \
    if [ -z "${debug}" ]; then apt-get -qy upgrade > /dev/null; fi && \
    apt-get -qy install sudo net-tools > /dev/null && \
    echo "${user}    ALL=(ALL:ALL)     NOPASSWD:ALL" | tee --append /etc/sudoers && \
    if [ -z "${debug}" ]; then apt cache clear > /dev/null; fi

USER ${user}:docker
WORKDIR ${app_root}

RUN if [ -n "${debug}" ]; then set -eux; fi && \
    npm install --no-fund -g npm@latest > /dev/null && \
    npm install --no-fund -g nx > /dev/null

COPY --chown=${user}:docker . .

RUN if [ -n "${debug}" ]; then set -eux; fi && \
    yarn install --frozen-lockfile && \
    sudo chown -R ${user}:docker .

RUN if [ -z "${debug}" ]; then yarn cache clean --all; fi
