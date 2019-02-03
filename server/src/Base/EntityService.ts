export default interface EntityService {

    /**
     * Get all the items from the DB.
     */
    getAll();

    /**
     * Load a single object from the DB.
     *
     * @param id
     *  The ID of the entry.
     */
    load(id: string);

    /**
     * Updating a single item.
     *
     * @param id
     *  The ID of the item.
     * @param values
     *  The values to update.
     * @param callback
     *  The callback for handling errors or success.
     */
    update(id: string, values: any, callback: any);

    /**
     * Creating an object.
     *
     * @param object
     *  The object to insert.
     */
    create(object: object);

    /**
     * Deleting an object from the service.
     *
     * @param id
     *  The ID of the object.
     */
    delete(id: string);
}
