const	express	=	require("express");
const	router	=	express.Router();
const	controller	=	require("../controllers/product.controller");
const	authenticate	=	require("../middleware/jwt.middleware");
const	validation	=	require("../middleware/zod.middleware");
const	{	CreateProductSchema,	UpdateStatusSchema	}	=	require("../schemas/product.schema");


router.get("/",	authenticate,	controller.getProducts);
router.get("/:id",	authenticate,	controller.getProductById);
router.post("/",	authenticate,	validation(CreateProductSchema),	controller.createProduct);
router.put("/:id/status",	authenticate,	validation(UpdateStatusSchema),	controller.updateProductStatus);


module.exports	=	router;



