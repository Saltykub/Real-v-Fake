import {
  pipeline,
  PipelineType,
  ProgressCallback,
  env,
} from "@huggingface/transformers";

export const config = {
  runtime: "edge", // Enables edge execution
};

env.localModelPath = "/tmp";
env.cacheDir = "/tmp";
env.backends.onnx.wasm ? (env.backends.onnx.wasm.numThreads = 1) : 0;
env.backends.onnx.enabled = true;

const P = () =>
  class PipelineSingleton {
    static task: PipelineType = "text-classification";
    static model: string = "Xenova/bert-base-multilingual-uncased-sentiment";
    static instance: Promise<any> | null = null;

    static async getInstance(
      progress_callback: ProgressCallback | undefined = undefined,
    ): Promise<any> {
      if (this.instance === null) {
        this.instance = pipeline(this.task, this.model, {
          progress_callback,
          dtype: "q8",
        });
      }
      return this.instance;
    }
  };

let PipelineSingleton: ReturnType<typeof P>;

declare global {
  var PipelineSingleton: ReturnType<typeof P> | undefined;
}

if (process.env.NODE_ENV !== "production") {
  // When running in development mode, attach the pipeline to the
  // global object so that it's preserved between hot reloads.
  // For more information, see https://vercel.com/guides/nextjs-prisma-postgres
  if (!global.PipelineSingleton) {
    global.PipelineSingleton = P();
  }
  PipelineSingleton = global.PipelineSingleton;
} else {
  PipelineSingleton = P();
}
export default PipelineSingleton;
