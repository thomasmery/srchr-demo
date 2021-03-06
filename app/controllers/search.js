define([
  'models/app',
  'data/search',
  'components/results',
  'components/searchForm',
  'components/recentSearches'
], function(app, SearchData, ResultsComponent, SearchFormComponent, RecentSearchesComponent) {
  return function(term) {
    var mainbar =   $('#mainbar').empty(),
        sidebar =   $('#sidebar').empty(),

        sf =        new SearchFormComponent().render().placeAt(mainbar),

        results =   new ResultsComponent({
                      searchData : SearchData
                    }).render().placeAt(mainbar),

        recent =    new RecentSearchesComponent({
                      searches : app.searches,
                      currentSearch : app.currentSearch
                    }).render().placeAt(sidebar);

    sf.on('search', function(term) {
      window.Router.navigate('/search/' + term, true);
    });

    app.currentSearch.on('change', function(s) {
      SearchData.term = s.get('term');
      SearchData.fetch();
    });

    update(term);

    function update(t) {
      return t && app.currentSearch.set('term', t);
    }

    return {
      controller : 'search',
      update : function(params) {
        return update(params.term);
      }
    };
  };
});
