import { addNewContact, getContacts, getContactWithID, updateContact, deleteContact } from '../controllers/crmController';
const routes = (app) => {
    app.route('/contact')
    .get((req,res,next) => {
        //middleware
        console.log(`Request from: ${req.orginalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
    },getContacts)
    .post(addNewContact);

    app.route('/contact/:contactId')
    // get sepcific contact
    .get(getContactWithID)
    // put request
    .put(updateContact)
    // delete request
    .delete(deleteContact);
};

export default routes;