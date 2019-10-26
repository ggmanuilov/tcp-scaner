import { checkOpenPortMultiple, Point } from "../TcpScaner";

/**
 * Задача: на основе функции checkOpenPort реализовать ф-ю:
 *  function checkOpenPortMulti(points: string[], timeout: number, concurrency: number): Promise<{ point: string, isOpen: boolean }[]>
 * Где points - массив строк содержащих host:port
 * timeout - таймаут ожидания для одной точки
 * concurrency - максимальное кол-во одновременно проверяемых соединений
 */

(async function test() {
  const points: Point[] = [
    {
      host: "google.com",
      port: 80
    },
    {
      host: "yandex.com",
      port: 80
    },
    {
      host: "norva.com",
      port: 80
    },
    {
      host: "sento.com",
      port: 80
    },
    {
      host: "limo.com",
      port: 80
    },
    {
      host: "sento.com",
      port: 80
    },
    {
      host: "limo.com",
      port: 80
    }
  ];
  console.log(
    "google.com 80    true: ",
    await checkOpenPortMultiple(points, 10000, 1)
  );
})();
