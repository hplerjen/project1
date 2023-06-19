Handlebars.registerHelper('formatDone', (isDone) => new Handlebars.SafeString(isDone? "Done" : "To Do"));

// eslint-disable-next-line no-undef
Handlebars.registerHelper('formatDateCH', (dateString) => new Handlebars.SafeString(moment(dateString).format("DD.MM.YYYY").toUpperCase())); 

