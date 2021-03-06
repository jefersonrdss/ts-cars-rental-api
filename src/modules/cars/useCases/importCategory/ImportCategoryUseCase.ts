import fs from "fs";
import csvParse from "csv-parse";
import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";

@injectable()
class ImportCategoryUseCase {

    constructor(
        @inject(CategoriesRepository)
        private categoriesRepository: ICategoriesRepository
    ) {}

    //load categories from file uploaded
    private loadCategories(file: Express.Multer.File): Promise<ICreateCategoryDTO[]> {

        return new Promise((resolve, reject) => {
            const categories: ICreateCategoryDTO[] = [];

            const stream = fs.createReadStream(file.path);
            const parseFile = csvParse();
            stream.pipe(parseFile);

            parseFile.on("data", async (line) => {

                const [name, description] = line;
                categories.push({ name, description });

            }).on("end", () => {

                fs.promises.unlink(file.path); //remove arquivo temporário
                resolve(categories);
            }).on("error", (error) => {
                
                reject(error);
            });
        })
    }

    // execute insert on categoriesRepositories
    async execute(file: Express.Multer.File): Promise<void> {

        const categories = await this.loadCategories(file);
        categories.forEach(async (category) => {
            const { name, description } = category;
            const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
            if(!categoryAlreadyExists){
                await this.categoriesRepository.create({
                    name,
                    description
                });
            }
        });
    }
}

export { ImportCategoryUseCase };