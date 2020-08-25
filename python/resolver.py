import json

def main():
  result = {
    "name": "Helen",
    "artists": [
      'foo1',
      'foo2',
      'foo3'
    ]
  }
  return json.dumps(result)


if __name__ == '__main__':
  print(main())