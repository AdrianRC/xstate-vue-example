import { Machine, assign } from "xstate";
import fetchRandomDog from "@/utils/fetchDog";

export default Machine({
  id: "dog fetcher",
  initial: "idle",
  context: {
    dog: null,
    error: null
  },
  states: {
    idle: {
      on: { FETCH: "loading" }
    },
    loading: {
      invoke: {
        src: () => fetchRandomDog(),
        onDone: {
          target: "success",
          actions: assign({ dog: (_, event) => event.data.message })
        },
        onError: {
          target: "failure",
          actions: assign({ error: (_, event) => event.data })
        }
      },
      on: { CANCEL: "idle" }
    },
    success: {
      on: { FETCH: "loading" }
    },
    failure: {
      on: { FETCH: "loading" }
    }
  }
});
