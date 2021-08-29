const BaseJoi = require("joi-browser");
const ImageExtension = require("joi-image-extension");

const Joi = BaseJoi.extend(ImageExtension);

export default Joi;
