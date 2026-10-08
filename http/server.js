require("dotenv").config({ quiet: true });

const http = require("node:http");
const PORT = process.env.PORT || 3000;

let contacts = [];
let tasks = [];
let notes = [];

let contactId = 1;
let taskId = 1;
let noteId = 1;

function contactHandler(req, res, segment) {

    res.setHeader("content-type", "application/json");
    
    //GET
    if (req.method === "GET" && !segment[1]) {
        const body = JSON.stringify(contacts);

        res.writeHead(200, {
            'content-length': Buffer.byteLength(body)
        });

        return res.end(body);
    }

    if (req.method === "GET" && segment[1]) {
        const id = +segment[1];

        const result = contacts.find((value) => value.id === id);

        if (result) {
            res.statusCode = 200;
            return res.end(JSON.stringify(result));
        } else {
            res.statusCode = 404;
            return res.end(JSON.stringify({ 
                "error": `Contact ${id} not found`
            }));
        }
    }

    //POST
    if (req.method === "POST" && !segment[1]) {
        
        let body = '';

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", async () => {
            if (!body.length) {
                res.writeHead(400);
                return res.end(JSON.stringify({ 
                    error: "Body is missing"
                }));
            } 

            let data;

            try {
                
                data = await readJSON(body);

                if (!data.name || !data.email) {
                    res.writeHead(400);
                    return res.end(JSON.stringify({
                        error: "Fields must be filled"
                    }));
                }

            } catch {
                res.writeHead(400);
                return res.end(JSON.stringify({ 
                    error: "Invalid JSON"
                }));
            }

            const contact = { 
                id: contactId++,
                name: data.name,
                email: data.email,
                phone: data.phone ?? null
            }
            
            contacts.push(contact);
            res.writeHead(201);
            return res.end(JSON.stringify(contact));
        });
    }

    //PUT
    if (req.method === "PUT" && segment[1]) {
        const id = +segment[1];

        const contact = contacts.find((value) => value.id === id);

        if (!contact) {
            res.writeHead(404);
            return res.end(JSON.stringify({
                error: "Contact not found"
            }))
        } 

        let body = '';

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", async () => {
            if (!body.length) {
                res.writeHead(400);
                return res.end(JSON.stringify({
                    error: "Body is missing"
                }));
            }

            let data;

            try {

                data = await readJSON(body);

            } catch {
                res.writeHead(400);
                return res.end(JSON.stringify({
                    error: "Invalid JSON"
                }));
            }

            if (data.name !== undefined) {
                contact.name = data.name;
            }

            if (data.email !== undefined) {
                contact.email = data.email;
            }

            if (data.phone !== undefined) {
                contact.phone = data.phone;
            }

            res.writeHead(200);
            return res.end(JSON.stringify(contact));
        });
    }

    //DELETE
    if (req.method === "DELETE" && segment[1]) {
        const id = +segment[1];

        const contactIndex = contacts.findIndex((value) => value.id === id);

        if (contactIndex === -1) {
            res.writeHead(404);
            return res.end(JSON.stringify({
                error: `Contact ${id} not found`
            }));
        }

        contacts.splice(contactIndex, 1);

        res.writeHead(200);
        return res.end(JSON.stringify({
            deleted: 1
        }));
    }

    res.writeHead(405);
    return res.end(JSON.stringify({
        error: "Method Not Allowed"
    }));
}

function tasksHandler(req, res, segment) {

    res.setHeader("content-type", "application/json");

    //GET
    if (req.method === "GET" && !segment[1]) {
        const body = JSON.stringify(tasks);

        res.writeHead(200);
        return res.end(body);
    }

    if (req.method === "GET" && segment[1]) {
        const id = +segment[1];

        const task = tasks.find((value) => value.id === id);

        if (!task) {
            res.writeHead(404);
            return res.end(JSON.stringify({
                error: "Task Not Found"
            }));
        }

        res.writeHead(200);
        return res.end(JSON.stringify(task));
    }

    //POST
    if (req.method === "POST" && !segment[1]) {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", async () => {
            if (!body.length) {
                res.writeHead(400);
                return res.end(JSON.stringify({
                    error: "Body is missing"
                }));
            }

            let data;

            try {

                data = await readJSON(body);

                if (!data.title) {
                    res.writeHead(400);
                    return res.end(JSON.stringify({
                        error: "Fields must be filled"
                    }));
                }
            
            } catch {

                res.writeHead(400);
                return res.end(JSON.stringify({
                    error: "Invalid JSON"
                }));

            }

            const task = {
                id: taskId++,
                title: data.title,
                completed: data.completed ?? false
            }

            tasks.push(task);
            res.writeHead(201);
            return res.end(JSON.stringify(task));
        })
    }

    //PUT
    if (req.method === "PUT" && segment[1]) {
        const id = +segment[1];

        const task = tasks.find((value) => value.id === id) 

        if (!task) {
            res.writeHead(404);
            return res.end(JSON.stringify(({
                error: "Task Not Found"
            })));
        }

        let body = "";
        
        req.on("data", (chunk) => {
            body += chunk;
        });
        
        req.on("end", async () => {
            if (!body.length) {
                res.writeHead(400);
                return res.end(JSON.stringify({
                    error: "Body is missing"
                }));
            }

            let data;

            try {
                data = await readJSON(body);
            } catch {
                res.writeHead(400);
                return res.end(JSON.stringify({
                    error: "Invalid JSON"
                }));
            }

            if (data.title !== undefined) {
                task.title = data.title;
            }

            if (data.completed !== undefined) {
                task.completed = data.completed;
            }

            res.writeHead(200);
            return res.end(JSON.stringify(task));
        })
    }

    //DELETE
    if (req.method === "DELETE" && segment[1]) {
        const id = +segment[1];

        const taskIndex = tasks.findIndex((value) => value.id === id);

        if (taskIndex === -1) {
            res.writeHead(404);
            return res.end(JSON.stringify({
                error: `Task ${id} Not Found`
            }));
        }

        tasks.splice(taskIndex, 1);

        res.writeHead(200);
        return res.end(JSON.stringify({
            deleted: 1
        }));
    }

    res.writeHead(405);
    return res.end(JSON.stringify({
        error: "Method Not Allowed"
    }));
}

function notesHandler(req, res, segment) {

    res.setHeader("content-type", "application/json");

    //GET
    if (req.method === "GET" && !segment[1]) {
        const body = JSON.stringify(notes);

        res.writeHead(200);
        return res.end(body);
    }

    if (req.method === "GET" && segment[1]) {
        const id = +segment[1];

        const result = notes.find((value) => value.id === id);

        if (!result) {
            res.writeHead(404);
            return res.end(JSON.stringify({
                error: "Note Not Found"
            }));
        }

        res.writeHead(200);
        return res.end(JSON.stringify(result));
    }

    //POST
    if (req.method === "POST" && !segment[1]) {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", async () => {
            if (!body.length) {
                res.writeHead(400);
                return res.end(JSON.stringify({
                    error: "Body is missing"
                }));
            }

            let data;

            try {
                data = await readJSON(body);

                if (!data.title || !data.content) {
                    res.writeHead(400);
                    return res.end(JSON.stringify({
                        error: "Missing fields"
                    }));
                }

            } catch {

                res.writeHead(400);
                return res.end(JSON.stringify({
                    error: "Invalid JSON"
                }));

            }

            const note = {
                id: noteId++,
                title: data.title,
                content: data.content
            };

            notes.push(note);
            res.writeHead(201);
            return res.end(JSON.stringify(note));
        })
    }

    //PUT
    if (req.method === "PUT" && segment[1]) {
        const id = +segment[1];

        const note = notes.find((value) => value.id === id);

        if (!note) {
            res.writeHead(404);
            return res.end(JSON.stringify({
                error: "Note Not Found"
            }));
        }

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        })

        req.on("end", async () => {
            if (!body.length) {
                res.writeHead(400);
                return res.end(JSON.stringify({
                    error: "Body is missing"
                }));
            }

            let data;

            try {
                data = await readJSON(body);
            }
            catch {
                res.writeHead(400);
                return res.end(JSON.stringify({
                    error: "Invalid JSON"
                }));
            }

            if (data.title !== undefined) {
                note.title = data.title;
            }

            if (data.content !== undefined) {
                note.content = data.content;
            }

            res.writeHead(200);
            return res.end(JSON.stringify(note));
        })
    }

    //DELETE
    if (req.method === "DELETE" && segment[1]) {
        const id = +segment[1];

        const noteIndex = notes.findIndex((value) => value.id === id);

        if (noteIndex === -1) {
            res.writeHead(404);
            return res.end(JSON.stringify({
                error: `Note ${id} Not Found`
            }));
        }

        notes.splice(noteIndex, 1);

        res.writeHead(200);
        return res.end(JSON.stringify({
            deleted: 1
        }));
    }

    res.writeHead(405);
    return res.end(JSON.stringify({
        error: "Method Not Allowed"
    }));

}

function readJSON(rawData) {
    return Promise.resolve().then(() => {
        return JSON.parse(rawData.toString());
    });
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    const segment = url.pathname.split('/').filter(Boolean);

    if (segment[0] === 'contacts') {
        return contactHandler(req, res, segment);
    } else if (segment[0] === 'tasks') {
        return tasksHandler(req, res, segment);
    } else if (segment[0] === 'notes') {
        return notesHandler(req, res, segment);
    }
    
    res.writeHead(404, {
        "content-type": "application/json"
    });

    return res.end(JSON.stringify({
        error: "Route Not Found"
    }));
});

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});