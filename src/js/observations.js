// Given a string, convert the first letter of each word in the string to a capital letter. 
function titleCase(s) {
  if (s == null) return "";
  var words = s.split(" ");
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  var result = words.join(" ");
  return result;
}

//transform the objects into the desired format, and return the new Array. 
function transformObservations(observations) {
  return observations.map((observation) => ({
    id: observation.id,
    uri: observation.uri,
    coords: observation.geojson.coordinates,
    date: new Date(observation.created_at),
    name:
      titleCase(observation.taxon.preferred_common_name) ||
      titleCase(observation.taxon.name),
    photoUrl: observation.taxon.default_photo.square_url,
    wikipediaUrl: observation.taxon.wikipedia_url,
    isNative: Boolean(observation.taxon.native),
    isintroduced: Boolean(observation.taxon.introduced),
    isEndangered: Boolean(observation.taxon.extinct),
    isThreatened: Boolean(observation.taxon.threatened),
  }));
}

// Take the array of observations and filter out any observations that haven't been identified yet a photo.
function filterObservations(observations) {
  const res = observations.filter(
    (observation) => observation.taxon && observation.taxon.default_photo
  );
  return res;
}

// Process all observation data in the window.data.results array 
// to a simpler format we can work with, and filter the observations to get
// rid of any that are missing data that we need.
function getAllObservations() {
  const filtered = filterObservations(data.results);
  const transformed = transformObservations(filtered);

  return transformed;
}

// Given an array of observations, filter out any that aren't native species and return the filtered array.
function filterOnlyNative(observations) {
  return observations.filter((observation) => observation.isNative);
}

// Given an array of observations, filter out any that aren't introduced species and return the filtered array.
function filterOnlyIntroduced(observations) {
  return observations.filter((observation) => observation.isintroduced);
}
