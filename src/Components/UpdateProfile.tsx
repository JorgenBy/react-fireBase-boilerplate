import { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { ETypes, MessageCard } from './Atoms/MessageCard';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { useToast, EToastTypes } from '../contexts/ToastContext';

export default function UpdateProfile() {
  const emailRef = useRef<HTMLInputElement>(null);
  const displayNameRef = useRef<HTMLInputElement>(null);
  const photoURLRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { currentUser, updatePassword, updateEmail, updateProfile } = useAuth();
  const { showTypedToast } = useToast();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      return setError('Passwords do not match');
    }

    const promises = [];
    setLoading(true);
    setError('');

    if (emailRef.current?.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current?.value));
    }
    if (
      displayNameRef.current?.value !== currentUser.displayName ||
      photoURLRef.current?.value
    ) {
      promises.push(
        updateProfile({
          displayName: displayNameRef.current?.value,
          photoURL: photoURLRef.current?.value,
        })
      );
    }
    if (passwordRef.current?.value) {
      promises.push(updatePassword(passwordRef.current?.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate('/');
        showTypedToast(EToastTypes.SUCCESS, 'Profile updated Successfully');
      })
      .catch(() => {
        setError('Failed to update account');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Update Profile
            </h2>
          </div>
          <MessageCard message={error} type={ETypes.DANGER} visible={!!error} />
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <div>
                  <label htmlFor="display-name" className="sr-only">
                    Display name
                  </label>
                  <input
                    id="display-name"
                    name="displayname"
                    type="text"
                    ref={displayNameRef}
                    defaultValue={currentUser.displayName}
                    className="relative block w-full appearance-none rounded-none rounded-t-md 
                    border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 
                    focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Display name"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    ref={emailRef}
                    defaultValue={currentUser.email}
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
              </div>
            </div>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label
                  htmlFor="photo-url"
                  className="py-1 text-sm text-gray-500 flex items-center "
                >
                  PhotoURL
                </label>
                <input
                  id="photo-url"
                  name="photourl"
                  type="text"
                  ref={photoURLRef}
                  defaultValue={currentUser.photoURL}
                  className="relative block w-full appearance-none rounded-none rounded-b-md 
                  rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 
                  focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Photo URL"
                />
              </div>
            </div>
            <div className="-space-y-px rounded-md shadow-sm">
              <h1 className="py-1 text-sm text-gray-500 flex items-center ">
                <AiFillExclamationCircle className="mr-1" /> Leave blank to keep
                the same
              </h1>
              <div>
                <label className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  ref={passwordRef}
                  className="relative block w-full appearance-none rounded-none rounded-t-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label className="sr-only">Confirm Password</label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  ref={passwordConfirmRef}
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative transition-colors flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Update
              </button>
            </div>
            <div className="text-sm text-center">
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500"
                to="/"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
