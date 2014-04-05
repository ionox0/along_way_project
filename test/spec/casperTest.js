

casper.test.begin('testing our REST API', 1, function suite(test) {

  casper.start('http://teamvega.herokuapp.com', function() {
    test.assertHttpStatus(200);
  });

  casper.then(function(){
    this.log('and then?');
    this.echo(this.getHTML('title'));
  });

  casper.run(function(){
    test.done();
  });

});