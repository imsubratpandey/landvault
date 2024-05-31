import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="home-page-container">
        <div className="home-page-title">
          LandVault
        </div>
        <div>
          <Link href="/home"><button className="home-page-button-user">Login As User</button></Link>
          <Link href="/admin"><button className="home-page-button-admin">Login As Admin</button></Link>
        </div>
      </div>
    </main>
  );
}
