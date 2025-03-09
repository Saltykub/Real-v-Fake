import {
  pipeline,
  PipelineType,
  ProgressCallback,
  env,
} from "@huggingface/transformers";

env.localModelPath = "/tmp";
env.cacheDir = "/tmp";
env.backends.onnx.wasm ? (env.backends.onnx.wasm.numThreads = 1) : 0;

const P = () =>
  class PipelineSingleton2 {
    static task: PipelineType = "text-classification";
    static model: string =
      "Xenova/distilbert-base-uncased-finetuned-sst-2-english";
    static instance: Promise<any> | null = null;

    static async getInstance(
      progress_callback: ProgressCallback | undefined = undefined,
    ): Promise<any> {
      if (this.instance === null) {
        this.instance = pipeline(this.task, this.model, {
          progress_callback,
          dtype: "q4f16",
        });
      }
      return this.instance;
    }
  };

let PipelineSingleton2: ReturnType<typeof P>;

declare global {
  var PipelineSingleton2: ReturnType<typeof P> | undefined;
}

if (process.env.NODE_ENV !== "production") {
  // When running in development mode, attach the pipeline to the
  // global object so that it's preserved between hot reloads.
  // For more information, see https://vercel.com/guides/nextjs-prisma-postgres
  if (!global.PipelineSingleton2) {
    global.PipelineSingleton2 = P();
  }
  PipelineSingleton2 = global.PipelineSingleton2;
} else {
  PipelineSingleton2 = P();
}
export default PipelineSingleton2;
