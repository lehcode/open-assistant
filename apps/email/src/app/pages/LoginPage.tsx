import { redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import { LoginRequest } from '@types';

const LoginPage = () => {
  const { provideLogin } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const loginRequest: LoginRequest = {
      username: formData.get('email') as string,
      password: formData.get('password') as string,
      rememberMe: formData.get('rememberMe') === 'on',
    };

    let result: { success: boolean; error?: any };
    
    try {
      result = await provideLogin(loginRequest);
      
      if (result.success) {
        redirect('/dashboard');
      }
    } catch ( error: any) {
      throw new Error('Login failed: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
