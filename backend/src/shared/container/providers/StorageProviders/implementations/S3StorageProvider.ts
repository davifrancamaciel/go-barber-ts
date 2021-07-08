import fs from 'fs'
import path from 'path'
import mime from 'mime-types'
import aws, { S3 } from 'aws-sdk'
import IStorageProvider from '../models/IStorageProvider'

import uploadConfig from '@config/upload'

class S3StorageProvider implements IStorageProvider {
  private client: S3
  constructor () {
    this.client = new aws.S3({
      region: 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })
  }
  public async saveFile (file: string): Promise<string> {
    const orginalPath = path.resolve(uploadConfig.tempFolder, file)
    const ContentType = mime.lookup(orginalPath)

    const fileContent = await fs.promises.readFile(orginalPath)

    if (!ContentType) {
      throw new Error('Arquivo não encontrado')
    }

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
        ContentDisposition: `inline; filename=${file}`
      })
      .promise()
    await fs.promises.stat(orginalPath)
    await fs.promises.unlink(orginalPath)
    return file
  }

  public async deleteFile (file: string): Promise<void> {
    try {
      await this.client
        .deleteObject({
          Bucket: uploadConfig.config.aws.bucket,
          Key: file
        })
        .promise()
    } catch (error) {
      return
    }
  }
}

export default S3StorageProvider
