Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('mytickets', {
    path: '/',
    template: 'mytickets'
  });
});
