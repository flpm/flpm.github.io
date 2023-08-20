import "../styles/globals.css";
import { iADuo } from "../components/fonts";

export default function App({ Component, pageProps }) {
  return (
    <main className={iADuo.className}>
      <Component {...pageProps} />
    </main>
  );
}
