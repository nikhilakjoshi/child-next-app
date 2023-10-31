import { type AppType } from "next/dist/shared/lib/utils";
import { CookiesProvider } from "react-cookie";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <Component {...pageProps} />
    </CookiesProvider>
  );
};

export default MyApp;
