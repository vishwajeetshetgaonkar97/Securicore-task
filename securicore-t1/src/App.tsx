import { useState, useEffect } from 'react'
import LogoDark from '../src/assets/Securicore_White.svg'
import LogoWhite from '../src/assets/Securicore_Dark.svg'
import FacebookIcon from '../src/assets/socialMedia/facebook.png'
import GoogleIcon from '../src/assets/socialMedia/google.png'
import LinkedInIcon from '../src/assets/socialMedia/linkedin.png'
import GithubInIcon from '../src/assets/socialMedia/github.png'
import LightModeIcon from '../src/assets/light.png'
import DarkModeIcon from '../src/assets/dark.png'
import './App.css'

function App() {
  const [dark, setDark] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  function toggleDark() {
    setDark(!dark);
  }

  function evaluatePasswordStrength(pwd) {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;

    if (strength <= 1) return 'Low';
    if (strength === 2 || strength === 3) return 'Medium';
    return 'Strong';
  }

  function handlePasswordChange(e) {
    const pwd = e.target.value;
    setPassword(pwd);
    setPasswordStrength(evaluatePasswordStrength(pwd));
  }

  function getStrengthColor() {
    switch (passwordStrength) {
      case 'Low':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Strong':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  }

  return (
    <div className='min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-white transition-colors duration-300'>
      <div onClick={toggleDark} className="absolute flex justify-end p-2 px-2 py-2 rounded-md transition cursor-pointer bottom-0 ">
            <img src={dark ? LightModeIcon : DarkModeIcon } alt="Google" className="w-7 h-7" />
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="relative w-full max-w-lg">
          <div className="mx-5 border dark:border-white/40 border-black/20 shadow-lg rounded-lg lg:rounded-xl">
            <div className='h-full w-full flex justify-center pt-6'>
              <img className='w-auto h-16 object-cover' src={dark ? LogoDark : LogoWhite} alt="logo" />
            </div>

            <div className="flex flex-col p-6">
              <h3 className="text-xl font-semibold leading-6 tracking-tighter">Login</h3>
              <p className="mt-1.5 text-sm font-medium text-gray-500 dark:text-white/60">
                Welcome back, enter your credentials to continue.
              </p>
            </div>

            <div className="p-6 pt-0">
              <form>
                <div className="group relative rounded-lg border focus-within:border-blue-400 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-blue-300/30">
                  <div className="flex justify-between">
                    <label className="text-xs font-medium text-gray-500 group-focus-within:text-black dark:group-focus-within:text-white">
                      Username
                    </label>
                    {username && (
                      <div className="absolute right-3 translate-y-2 text-green-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0"
                  />
                </div>

                <div className="mt-4 group relative rounded-lg border focus-within:border-blue-400 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-blue-300/30">
                  <div className="flex justify-between">
                    <label className="text-xs font-medium text-gray-500 group-focus-within:text-black dark:group-focus-within:text-white">
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0"
                  />

                </div>
                {/* Password Strength Bar */}
                {password && (
                  <div className="mt-2">
                    <div className="h-1 w-full bg-gray-300 rounded-full">
                      <div className={`h-1 rounded-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: `${passwordStrength === 'Low' ? 33 : passwordStrength === 'Medium' ? 66 : 100}%` }}></div>
                    </div>
                    <p className={`text-right text-xs mt-1 ${passwordStrength === 'Low' ? 'text-red-500' : passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                      {passwordStrength}
                    </p>
                  </div>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="remember" />
                    <span className="text-xs">Remember me</span>
                  </label>
                  <a className="text-sm font-medium underline" href="/forgot-password">
                    Forgot password?
                  </a>
                </div>

                <div className="mt-4 flex items-center justify-end gap-x-2">
                  {/* <a className="rounded-md px-4 py-2 text-sm border hover:bg-gray-100 dark:hover:bg-gray-800 transition" href="/register">
                    Register
                  </a> */}
                  <button type="submit" className="cursor-pointer rounded-md w-full px-4 py-2 text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 transition">
                    Log in
                  </button>
                </div>
              </form>
            </div>

            <div className="my-1">
              <div className="flex items-center">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
              </div>

              <div className="mt-4 pb-4 flex flex-row gap-3 justify-center">
                <button className="flex items-center justify-center gap-3 w-fit rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  <img src={GoogleIcon} alt="Google" className="w-7 h-7" />
                </button>

                <button className="flex items-center justify-center gap-3 w-fit rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  <img src={FacebookIcon} alt="Google" className="w-7 h-7" />
                </button>

                <button className="flex items-center justify-center gap-3 w-fit rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  <img src={GithubInIcon} alt="Google" className="w-7 h-7" />
                </button>

                <button className="flex items-center justify-center gap-3 w-fit rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  <img src={LinkedInIcon} alt="Google" className="w-7 h-7" />
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default App
