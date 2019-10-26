### Задание 1

Реализовать функцию проверяющую открытость заданного TCP порта на заданном хосте.
Если подключение к порту не осуществлено в течении определённого времени - считать порт закрытым.

Интерфейс функции:

```typescript
// see src/examples/OpenPortSimple.ts
import { checkOpenPort } from "src/TcpScaner";
(async function test() {
  console.log(await checkOpenPort("google.com", 80, 10000)); // true
  console.log(await checkOpenPort("google.com", 1234, 10000)); // false
  console.log(await checkOpenPort("127.0.0.1", 80, 10000)); // true
  console.log(await checkOpenPort("127.0.0.1", 3306, 10000)); // true
  console.log(await checkOpenPort("5.5.5.5", 80, 10000)); // false
})();
```

При реализации запрещено пользоваться сторонними модулями(кроме тайпскрипта разумеется)

### Задание 2

Задача: на основе функции checkOpenPort реализовать ф-ю:
function checkOpenPortMulti(points: string[], timeout: number, concurrency: number): Promise<{ point: string, isOpen: boolean }[]>
Где points - массив строк содержащих host:port
timeout - таймаут ожидания для одной точки
concurrency - максимальное кол-во одновременно проверяемых соединений

```typescript
// see src/examples/CheckConcurrency.ts
import { checkOpenPortMultiple, Point } from "src/TcpScaner";
(async function test() {
  const points: Point[] = [
    {
      host: "google.com",
      port: 80
    },
    {
      host: "google.com",
      port: 1234
    },
    {
      host: "127.0.0.1",
      port: 80
    },
    {
      host: "127.0.0.1",
      port: 2265
    }
  ];
  console.log(await checkOpenPortMultiple(points, 10000, 2));
})();
```
