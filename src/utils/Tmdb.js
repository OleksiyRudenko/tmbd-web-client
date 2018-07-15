const apiConfig = {
  key: '5265606bb69e99437c85eb04dc6f29b5',
  baseUrl: 'https://api.themoviedb.org/3/',
  imageBaseUrl: 'http://image.tmdb.org/t/p/',
};

class _Tmdb {
  constructor() {
    this.apiConfig = apiConfig;
    this.imageConfig = undefined;
  }

  /**
   * Get movie by id. A shorthand for specialized query()
   * @param {number|string} movieId
   * @param {[string]} subPath
   * @returns {Promise<Response>}
   */
  getMovie(movieId, subPath = []) {
    return this.query('movie/', [movieId, ...subPath]);
  }

  /**
   * Commits a general purpose query
   * @param {string} endPoint - like 'movie/'
   * @param {[string]} pathParams - like [movieId, 'images']
   * @param {[Object]} searchParams -
   *        [key0:value0, key1:value1], will transform into ?key0=value0&key1=value1,
   *        keys and values URL encoded for safety and consistency
   * @returns {Promise<Response>}
   */
  query(endPoint, pathParams = [], searchParams = {}) {
    return fetch(this._makeGetUrl(endPoint, pathParams, searchParams))
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .catch(rejection => {
        throw rejection;
      });
  }

  /**
   * Gets image url of given size. Call getImageryConfig() for details
   * @param {string} filePath
   * @param {number|string} size
   * @returns {string}
   */
  getImageUrl(filePath, size) {
    return this.apiConfig.imageBaseUrl + 'w' + size + filePath;
  }

  /**
   * Gets imagery configuration from TMDB API server
   * @returns {Promise<any>}
   */
  getImageryConfig() {
    return this.imageConfig
      ? Promise.resolve(this.imageConfig)
      : this.query('configuration').then(config => {
          this.imageConfig = config;
          return config;
        });
  }

  /**
   * Builds an URL for GET request from components
   * @param {string} endPoint - like 'movie/'
   * @param {[string]} pathParams - like [movieId, 'images']
   * @param {[Object]} searchParams -
   *        [key0:value0, key1:value1], will transform into ?key0=value0&key1=value1,
   *        keys and values URL encoded for safety and consistency
   * @returns {string}
   * @private
   */
  _makeGetUrl(endPoint, pathParams, searchParams) {
    searchParams = Object.assign(searchParams, { api_key: apiConfig.key });
    const searchParamsList = Object.keys(searchParams).map(
      key => encodeURI(key) + '=' + encodeURI(searchParams[key])
    );
    return (
      this.apiConfig.baseUrl +
      endPoint +
      pathParams.join('/') +
      '?' +
      searchParamsList.join('&')
    );
  }
}

export const Tmdb = new _Tmdb();
