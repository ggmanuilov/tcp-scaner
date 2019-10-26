import { checkOpenPort } from "../TcpScaner";

(async function test() {
  console.log(
    "google.com 80    true: ",
    await checkOpenPort("google.com", 80, 10000)
  ); // true
  console.log(
    "google.com 1234 false: ",
    await checkOpenPort("google.com", 1234, 10000)
  ); // false
  console.log(
    "127.0.0.1 80     true: ",
    await checkOpenPort("127.0.0.1", 80, 10000)
  ); // true
  console.log(
    "127.0.0.1 3306   true: ",
    await checkOpenPort("127.0.0.1", 3306, 10000)
  ); // true
  console.log(
    "5.5.5.5   80    false: ",
    await checkOpenPort("5.5.5.5", 80, 10000)
  ); // false
})();
