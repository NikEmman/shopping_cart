import Welcome from "../assets/Welcome";
export default function HomePage() {
  return (
    <div className="homePage" data-testid="homePage">
      <h1>
        <Welcome />
      </h1>
    </div>
  );
}
