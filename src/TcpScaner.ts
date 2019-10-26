import net from "net";

interface Point {
  host: string;
  port: number;
}

interface Response extends Point {
  isOpen: boolean;
}

/**
 * Check open port
 * @param host
 * @param port
 * @param timeout
 */
const checkOpenPort = async function(
  host: string,
  port: number,
  timeout: number
): Promise<boolean> {
  return new Promise(resolve => {
    function onResolve(status: boolean, client: net.Socket) {
      clearTimeout(timer);
      client.removeAllListeners();
      client.end();
      client.destroy();
      resolve(status);
    }

    const client = net.createConnection(port, host);

    client.on("connect", () => onResolve(true, client));
    client.on("timeout", () => onResolve(false, client));
    client.on("error", () => onResolve(false, client));

    const timer = setTimeout(() => onResolve(false, client), timeout);
  });
};

/**
 * Check open port concurrency
 * @param points
 * @param timeout
 * @param concurrency
 */
const checkOpenPortMultiple = async function(
  points: Point[],
  timeout: number,
  concurrency: number
): Promise<Response[]> {
  let responsePool: Response[] = [];
  let executing: Promise<void>[] = [];

  for (const point of points) {
    const promiseItem = checkOpenPort(point.host, point.port, timeout).then(
      status => {
        responsePool.push({
          ...point,
          isOpen: status
        });
        executing.splice(executing.indexOf(promiseItem), 1);
      }
    );
    executing.push(promiseItem);

    if (executing.length >= concurrency) {
      await Promise.race(executing);
    }
  }
  return Promise.all(responsePool);
};

export { checkOpenPort, checkOpenPortMultiple, Point };
