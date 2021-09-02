import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { ListCategoriesController } from "./ListCategoriesController";

const categoriesRepository = CategoriesRepository.getInstance();
const listCategoryUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController  = new ListCategoriesController(listCategoryUseCase);

export { listCategoriesController };