import EntityService from './EntityService';

export default abstract class AbstractEntityService implements EntityService {

    public abstract getSchema();

    public async getAll() {
        return await this.getSchema().find({}).lean();
    }

    public async load(id: string) {
        return this.getSchema().findById(id).lean();
    }

    public update(id: string, values: any, callback: any = null) {
        return this.getSchema().findOneAndUpdate({_id: id}, values, {new: true}, callback).exec();
    }

    public async create(object: object) {
        const product = new (this.getSchema())(object);

        return await product.save();
    }

    public async delete(id: string) {
        const loadedProduct = await this.getSchema().findById(id);

        if (!loadedProduct) {
            return new Promise((resolve, reject) => {
                reject("item_not_exists");
            });
        }

        return await this.getSchema().deleteOne({_id: id});
    }

}
