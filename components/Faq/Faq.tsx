import React from 'react';
import Header from '../shared/header';
import Footer from '../shared/footer';
import Link from 'next/link';
import Image from 'next/image';
const Faq = ({ session }: { session: any }) => {
  return (
    <div className="min-h-screen bg-[#01221b] text-white flex flex-col">
      <Header session={session} />

      <main className="flex-1 w-full max-w-7xl mx-auto p-6 py-22">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT MENU */}
          <nav className="bg-[#050f12] rounded-lg p-6 shadow-md border border-[#292929] w-full lg:w-1/4">
            <ul className="space-y-3 text-[12px]">
              <li>
                <Link
                  href="/Faq/GettingStarted"
                  className="block text-gray-300 hover:text-[#50D2C1] transition"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  href="/Faq/DepositWithdrawal"
                  className="block text-gray-300 hover:text-[#50D2C1] transition"
                >
                  Deposit / Withdrawal
                </Link>
              </li>
              <li>
                <Link
                  href="/Faq/Trading"
                  className="block text-gray-300 hover:text-[#50D2C1] transition"
                >
                  Trading
                </Link>
              </li>
              <li>
                <Link
                  href="/Faq/Chart"
                  className="block text-gray-300 hover:text-[#50D2C1] transition"
                >
                  Chart
                </Link>
              </li>
              <li>
                <Link
                  href="/Faq/Account"
                  className="block text-gray-300 hover:text-[#50D2C1] transition"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  href="/Faq/AffiliateProgram"
                  className="block text-gray-300 hover:text-[#50D2C1] transition"
                >
                  Referral Program
                </Link>
              </li>
            </ul>
          </nav>

          {/* RIGHT CONTENT */}
          <div className="flex-1 bg-[#050f12] rounded-lg p-6 shadow-md border border-[#292929]">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <Image src="/images/icons/faq.png" alt="FAQ Icon" width={120} height={120} />
            </div>

            {/* SEARCH BAR */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search help articles"
                className="w-full bg-[#252525] text-white border border-gray-700 rounded-md p-3 outline-none focus:border-[#50D2C1]"
              />
            </div>

            {/* CATEGORY GRID */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* CARD */}
              {[
                {
                  title: 'Getting Started',
                  links: [
                    'How do I create an account?',
                    'How to enable 2FA?',
                    'How can I make a deposit?',
                    'How do I place an order?',
                    'How to close a position?',
                  ],
                  href: '/Faq/GettingStarted',
                },
                {
                  title: 'Deposit / Withdrawal',
                  links: [
                    'How can I make a deposit?',
                    'What is the minimum deposit amount?',
                    'How long does it take to make a deposit?',
                    'What if I send funds to someone else’s address?',
                    'How can I make a withdrawal?',
                  ],
                  href: '/Faq/DepositWithdrawal',
                },
                {
                  title: 'Trading',
                  links: [
                    'How do I place an order?',
                    'Are market order fees higher than limit order fees?',
                    'How do I place buy limit orders?',
                  ],
                  href: '/Faq/Trading',
                },
                {
                  title: 'Chart',
                  links: [
                    'Where do you get the quotes from?',
                    'How do I enlarge the chart?',
                    'Where is the price value on the chart?',
                    'Do you have a countdown function?',
                    'How do I reset the chart to default settings?',
                  ],
                  href: '/Faq/Chart',
                },
                {
                  title: 'Account',
                  links: [
                    'How do I create an account?',
                    'I forgot my password, how can I change it?',
                    'How to enable 2FA?',
                    'Why is 2FA not working when logging in?',
                  ],
                  href: '/Faq/Account',
                },
                {
                  title: 'Referral Program',
                  links: [
                    'What is the Referral Program?',
                    'How much will I get per referral?',
                    'What traffic sources can I use?',
                    'When are referrals paid?',
                  ],
                  href: '/Faq/AffiliateProgram',
                },
              ].map((category, i) => (
                <div
                  key={i}
                  className="bg-[#050f12] rounded-lg p-5 border border-[#333] hover:border-[#50D2C1] transition"
                >
                  <h3 className="text-xl font-semibold text-[#50D2C1] mb-3">{category.title}</h3>
                  <ul className="space-y-2 text-gray-300 text-[12px]">
                    {category.links.map((link, j) => (
                      <li key={j}>
                        <Link href={category.href} className="hover:text-[#50D2C1] transition">
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Faq;

/*

import Header from '../shared/header';
import Footer from '../shared/footer';
import Link from 'next/link';
import Image from 'next/image';

const Faq = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="faq-container">
        <nav className="faq-menu desktop-menu">
          <ul>
            <li>
              <Link href="/Faq/GettingStarted" className="faq-category-button">
                <span>Getting Started</span>
              </Link>
            </li>
            <li>
              <Link href="/Faq/DepositWithdrawal" className="faq-category-button">
                <span>Deposit / Withdrawal</span>
              </Link>
            </li>
            <li>
              <Link href="/Faq/Trading" className="faq-category-button">
                <span>Trading</span>
              </Link>
            </li>
            <li>
              <Link href="/Faq/Chart" className="faq-category-button">
                <span>Chart</span>
              </Link>
            </li>
            <li>
              <Link href="/Faq/Account" className="faq-category-button">
                <span>Account</span>
              </Link>
            </li>
            <li>
              <Link href="/Faq/AffiliateProgram" className="faq-category-button">
                <span>Referral Program</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="faq-content">
          <div className="header-image">
            <Image src="/images/icons/faq.png" alt="FAQ Header Image" width={40} height={40} />
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search help articles" />
            <div className="search-results hidden"></div>
          </div>
          <div className="category-grid">
            <div className="category-card">
              <h3>Getting Started</h3>
              <ul>
                <li>
                  <Link href="/Faq/GettingStarted">
                    <span>How do I create an account</span>
                  </Link>
                </li>
                <li>
                  <Link href="/Faq/GettingStarted">
                    <span>How do enable 2FA?</span>
                  </Link>
                </li>
                <li>
                  <Link href="/Faq/GettingStarted">
                    <span>How can I make a deposite?</span>
                  </Link>
                </li>
                <li>
                  <Link href="/Faq/GettingStarted">
                    <span>How do I place an order?</span>
                  </Link>
                </li>
                <li>
                  <Link href="/Faq/GettingStarted">
                    <span>How to close a position?</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="category-card">
              <h3>Deposit / Withdrawal</h3>
              <ul>
                <li>
                  <Link href="/Faq/DepositWithdrawal">
                    <span>How can I make a deposite?</span>
                  </Link>
                </li>

                <li>
                  <Link href="/Faq/DepositWithdrawal">
                    <span>What is the minimum deposit amount?</span>
                  </Link>
                </li>

                <li>
                  <Link href="/Faq/DepositWithdrawal">
                    <span>How long does it take to make a deposit?</span>
                  </Link>
                </li>

                <li>
                  <Link href="/Faq/DepositWithdrawal">
                    <span>What if I send funds to someone else's</span>
                  </Link>
                </li>

                <li>
                  <Link href="/Faq/DepositWithdrawal">
                    <span>How can I make a deposite?</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="category-card">
              <h3>Trading</h3>
              <ul>
                <li>
                  <Link href="/Faq/Trading">
                    <span>How do I place an order?</span>
                  </Link>
                </li>
                <li>
                  <Link href="/Faq/Trading">
                    <span>Are market order fees higher than limit order fees?</span>
                  </Link>
                </li>
                <li>
                  <Link href="/Faq/Trading">
                    <span>Are market order fees higher than limit order fees?</span>
                  </Link>
                </li>
                <li>
                  <Link href="/Faq/Trading">
                    <span>How do I place buy limit orders?</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="category-card">
              <h3>Chart</h3>
              <ul>
                <li>
                  <Link href="/Faq/Chart">
                    <span>Where do you get the quotes from?</span>
                  </Link>
                </li>

                <li>
                  <Link href="/Faq/Chart">
                    <span>How do I enlarge the chart?</span>
                  </Link>
                </li>

                <li>
                  <Link href="/Faq/Chart">
                    <span>Where is the price value on the chart?</span>
                  </Link>
                </li>

                <li>
                  <Link href="/Faq/Chart">
                    <span>Do you have a countdown function?</span>
                  </Link>
                </li>

                <li>
                  <Link href="/Faq/Chart">
                    <span>How do I return the chart to the default settings?</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="category-card">
              <h3>Account</h3>
              <ul>
                <li>
                  <Link href="/Faq/Account">
                    <span>How do I create an account?</span>
                  </Link>
                </li>
                <li>
                  <Link href="/Faq/Account">
                    <span>I forgot my password, how can I change it?</span>
                  </Link>
                </li>
                <li>
                  <Link href="/Faq/Account">
                    <span>How to enable 2FA?</span>
                  </Link>
                </li>
                <li>
                  <Link href="/Faq/Account">
                    <span>
                      Why is 2FA not working when I log in to my account, after I enabled it?
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="category-card">
              <h3>Referral Program</h3>
              <ul>
                <li>
                  <Link href="/Faq/AffiliateProgram">
                    <span>What is the Referral program?</span>
                  </Link>
                </li>

                <li>
                  <Link href="/Faq/AffiliateProgram">
                    <span>How much will I get for each targeted action?</span>
                  </Link>
                </li>

                <li>
                  <Link href="/Faq/AffiliateProgram">
                    <span>What traffic sources can I use?</span>
                  </Link>
                </li>

                <li>
                  <Link href="/Faq/AffiliateProgram">
                    <span>When are referrals paid?</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Faq;

*/
