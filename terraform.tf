terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "eu-west-1"
  shared_config_files = ["/home/shodan/.aws/config"]
  shared_credentials_files = ["/home/shodan/.aws/credentials"]
  profile                  = "appsec"
}
