Handlebars.registerHelper('formatDone', (isDone) => new Handlebars.SafeString(isDone? "Done" : "To Do"));

Handlebars.registerHelper('formatDateCH', (dateString) => new Handlebars.SafeString(moment(dateString).format("DD.MM.YYYY").toUpperCase())); 

