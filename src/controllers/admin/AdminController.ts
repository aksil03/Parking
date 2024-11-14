import { createFactory } from 'hono/factory';
import AdminView from '../../views/admin/AdminView';

const factory = createFactory();

const handlers = factory.createHandlers(async (c) => {
    const html = AdminView(); 
    return c.html(html); 
});

export default {
    handlers
};