import {setInterval as every} from 'timers/promises'

import type { LoaderFunction } from "@remix-run/node";


export let loader: LoaderFunction = ({request: {signal}}) => {
  let body = new ReadableStream({
    async start(controller) {
      signal.addEventListener('abort', () => controller.close())

      for await (let _ of every(1_000, undefined, {signal})) {
        controller.enqueue('data: asdfghjkl\n\n')
      }
    }
  })

  return new Response(body, {
    headers: {
      'Content-Type': 'text/event-stream',
    }
  })
}