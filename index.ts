import type {DynamoDBClient} from "@aws-sdk/client-dynamodb"
import {SessionData, Store} from "express-session"

interface StoreOptions {
  client: any
  tableName: string
  hashKey: string
  hashKeyType: string
  rangeKey?: string
  rangeKeyType?: string
  prefix?: string
  ttl?: number
}

class DynamoStore extends Store {
  client: DynamoDBClient
  tableName: string
  hashKey: string
  hashKeyType: string
  rangeKey: string | undefined
  rangeKeyType: string
  prefix: string
  ttl: number | {(sess: SessionData): number}

  constructor(opts: StoreOptions) {
    super()
    this.client = opts.client
    this.tableName = opts.tableName
    this.hashKey = opts.hashKey
    this.hashKeyType = opts.hashKeyType == null ? "S" : opts.hashKeyType
    this.rangeKey = opts.rangeKey
    this.rangeKeyType = opts.rangeKeyType == null ? "S" : opts.rangeKeyType
    this.prefix = opts.prefix == null ? "SESSION#" : opts.prefix
    this.ttl = opts.ttl || 86400 // One day in seconds.
  }
}
