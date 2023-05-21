import { log } from "logger";

export default function Store() {
  log("Hey! This is Home.");
  return (
    <div className="container">
      <h1>Ecommerce Microservices</h1>
      <p className="description">
        <a href="login">Login</a>
        <br />
        <a href="register">Register</a>
        <br />
        <a href="products">Products</a>
        <br />
      </p>
    </div>
  );
}
