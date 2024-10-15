var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = './main.worker.js';
(() => __awaiter(void 0, void 0, void 0, function* () {
    const loadingTask = pdfjsLib.getDocument("example.pdf");
    const pdf = yield loadingTask.promise;
    const page = yield pdf.getPage(1);
    const scale = 1;
    const viewport = page.getViewport({ scale });
    const canvas = document.getElementById("pdf");
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = {
        canvasContext: context,
        viewport: viewport,
    };
    yield page.render(renderContext);
    console.log("Page rendered!");
}))();
//# sourceMappingURL=index.js.map