'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';

const AuthButton = () => {

      const session = useSession();      

      return (
            <div>
                  {
                        session.status === 'authenticated' ? (
                              <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-circle btn-primary"><FaUser className='w-5 h-5'></FaUser></div>
                                    <ul
                                          tabIndex={-1}
                                          className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-32 p-2 shadow-sm">
                                          <li><a>Profile</a></li>
                                          <li><button onClick={() => signOut()}>Sign out</button></li>
                                    </ul>
                              </div>) :
                              (
                                    <Link href="/signin" className="btn btn-primary mx-3">
                                          Sign in
                                    </Link>
                              )

                  }
            </div >
      );
};

export default AuthButton;