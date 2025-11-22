type Maybe<T> =
  | { kind: "some"; value: T }
  | { kind: "none" };

function some<T>(value: T): Maybe<T> {
  return { kind: "some", value };
}

function none<T>(): Maybe<T> {
  return { kind: "none" };
}

function isSome<T>(maybe: Maybe<T>): maybe is { kind: "some"; value: T } {
  return maybe.kind === "some";
}

function mapMaybe<T, U>(maybe: Maybe<T>, transform: (value: T) => U): Maybe<U> {
  if (maybe.kind === "none") {
    return none<U>();
  }

  const newValue = transform(maybe.value);
  return some(newValue);
}

function flatMapMaybe<T, U>(
  maybe: Maybe<T>,
  transform: (value: T) => Maybe<U>
): Maybe<U> {
  if (maybe.kind === "none") {
    return none<U>();
  }

  return transform(maybe.value);
}

function getOrElse<T>(maybe: Maybe<T>, fallback: T): T {
  if (maybe.kind === "some") {
    return maybe.value;
  }

  return fallback;
}
