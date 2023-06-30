import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useUser from "../helper/useUser";
import InstallPWA from "./InstallBtn";
import UserSettings from "./UserSettings";
const navigation = [
  { name: "navbar.Home", href: "/" },
  { name: "navbar.Upcoming_Days", href: "/upcoming" },
  { name: "navbar.Date_Converter", href: "/converter" },
  { name: "navbar.About", href: "/about" },
  { name: "navbar.Privacy_Policy", href: "/privacy" },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  // find current route
  const location = useLocation();
  const { t } = useTranslation();

  const { photoUrl, status } = useUser();
  return (
    <Disclosure as="nav" className="border-b bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:text-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="/icons/icon-512x512.png"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="/icons/icon-512x512.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex items-center space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.href === location.pathname ? "bg-gray-200" : "text-gray-900",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.href === location.pathname ? "page" : undefined}>
                        {t(item.name)}
                      </Link>
                    ))}
                    <InstallPWA>
                      <button className="rounded-md px-3 py-2 text-sm font-medium">Install</button>
                    </InstallPWA>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {status === "LOGGED_IN" ? (
                  <UserSettings status={status} photoUrl={photoUrl} />
                ) : status === "NOT_LOGGED_IN" ? (
                  <UserSettings status={status} />
                ) : (
                  <UserSettings status={status} />
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.href === location.pathname ? "bg-gray-300" : "text-gray-900",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.href === location.pathname ? "page" : undefined}>
                  {t(item.name)}
                </Disclosure.Button>
              ))}
              {/* <LanguageChangeDropDown /> */}
              <InstallPWA>
                <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium">
                  Install
                </Disclosure.Button>
              </InstallPWA>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
