export const integerOnly = {
  type: Number,
  get: v => Math.round(v),
  set: v => Math.round(v)
}

export const coffeeType = {
  type: String,
  enum: ['arabica', 'robusta'],
  required: true
}
