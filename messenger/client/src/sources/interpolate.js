class Interpolate {

  static json(strings, ...values) {
    let result = '';
    for(let i = 0; i < strings.length - 1; i++) {
      result += strings[i] + JSON.stringify(values[i]);
    }
    result += strings[strings.length - 1];
    return result;
  }

}

export default Interpolate;
