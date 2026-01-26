import React from 'react';
import Header from '../shared/header';
import Footer from '../shared/footer';
import { LetterTextIcon, Mail, MailCheck, MailOpen } from 'lucide-react';

const ForgotPassword = ({ session }: { session: any }) => {
  return (
    <div>
      <div>
        <Header session={session} />
      </div>
      <div className="containter">
        <div className="reset-password-container">
          <h2>Rest your password</h2>
          <p>
            To reset your password, enter your registered email. FYBIT support will then email you
            an ID verification link.
          </p>

          <div className="">
            <div>Email</div>

            <form className="form-inline flex space-x-2">
              <div className="relative w-full">
                <input
                  type="email"
                  name="email"
                  placeholder="example@mail.com"
                  required
                  className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#50D2C1]"
                />
                <input type="hidden" name="timestamp" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </span>
              </div>

              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ForgotPassword;
