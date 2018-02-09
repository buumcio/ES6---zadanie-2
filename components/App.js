var GIPHY_ERR = 'https://media.tenor.com/images/1578e4ac8d8758de04a1d540e08a5ec0/tenor.gif';

App = React.createClass({

    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },
    
    handleSearch: function(searchingText) {  // 1.
        this.setState({
            loading: true  // 2.
        });
        this.getGif(searchingText, function(gif) {  // 3.
            this.setState({  // 4
                loading: false,  // a
                gif: gif,  // b
                searchingText: searchingText  // c
        });
        }.bind(this));
    },

    getGif: function(searchingText) { 
        return new Promise(
            function (resolve, reject) {


                var GIPHY_API_URL = 'http://api.giphy.com';
                var GIPHY_PUB_KEY = 'yiyfh3SNykDaUmo4rjYFIqbQrrXvKSai'; // 1.
                var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
                var xhr = new XMLHttpRequest();  // 3.
                xhr.open('GET', url);
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText).data; // 4.
                        var gif = {  // 5.
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                        };
                        resolve(gif);  // 6.
                    }
                 };
                xhr.onerror = function() {
                    reject(console.log('Wystąpił błąd podczas ładowania obrazku'));
                    };
                xhr.send();
        });  
    },


    handleSearch: function(searchingText) { 
    this.setState({
      loading: true 
    });
    this.getGif(searchingText).then((gif)=> { 
      this.setState({ 
        loading: false,  
        gif: gif,  
      });
    })
    .catch(() => {
        this.setState({ 
        loading: false,  
        gif: {url: GIPHY_ERR, sourceUrl: GIPHY_ERR} 
      });
    });
    ;
  },

    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFów!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search 
                onSearch={this.handleSearch}
                />
            <Gif
                loading={this.state.loading}
                url={this.state.gif.url}
                sourceUrl={this.state.gif.sourceUrl}
            />
          </div>
        );
    }
});

