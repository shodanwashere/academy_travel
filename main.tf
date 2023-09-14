resource "aws_vpc" "this" {
  cidr_block = "13.37.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
  
  tags = {
    Name = "Travel.r Backend VPC (DO NOT DELETE UNTIL SEPT 16TH)"
    Terraform = true
  }
}

resource "aws_subnet" "this" {
  vpc_id = aws_vpc.this.id
  cidr_block = "13.37.0.0/24"

  tags = {
    Name = "Travel.r Backend Public Subnet (DO NOT DELETE UNTIL SEPT 16TH)"
    Terraform = true
  }
}

resource "aws_internet_gateway" "this" {
  vpc_id = aws_vpc.this.id
  
  tags = {
    Name = "Travel.r Backend Internet Gateway (DO NOT DELETE UNTIL SEPT 16TH)"
    Terraform = true
  }
}

resource "aws_route_table" "public_subnet" {
  vpc_id = aws_vpc.this.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.this.id
  }

  tags = {
    Name = "Travel.r Backend Route Table (DO NOT DELETE UNTIL SEPT 16TH)"
    Terraform = true
  }
}

resource "aws_route_table_association" "subnet_rt" {
  subnet_id = aws_subnet.this.id
  route_table_id = aws_route_table.public_subnet.id
}

data "aws_security_group" "vpc" {
  vpc_id = aws_vpc.this.id
}

resource "aws_security_group_rule" "ingress" {
  type = "ingress"
  from_port = 0
  to_port   = 0
  protocol  = "-1"
  security_group_id = data.aws_security_group.vpc.id
  cidr_blocks = ["0.0.0.0/0"]
}

data "aws_route53_zone" "cfappsecurity" {
  name = "cfappsecurity.com"
  private_zone = false
}

resource "tls_private_key" "backend_server" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "backend_server" {
  key_name = "travelr-backend"
  public_key = tls_private_key.backend_server.public_key_openssh
}

resource "local_file" "private_key" {
  content = tls_private_key.backend_server.private_key_pem
  filename = "${path.module}/backend.pem"
}

resource "aws_instance" "backend_server" {
  depends_on = [aws_security_group_rule.ingress, aws_route_table_association.subnet_rt]
  ami = "ami-07bd3fbc3217a2ea2"
  instance_type = "t2.micro"
  key_name = aws_key_pair.backend_server.key_name

  associate_public_ip_address = true
  subnet_id = aws_subnet.this.id
  user_data_base64 = filebase64("${path.module}/user_data")

  tags = {
    Name = "Travel.r Backend Server (DO NOT DELETE UNTIL SEPT 16TH)"
    Terraform = true
  }
}

resource "aws_route53_record" "public_hostname" {
  zone_id = data.aws_route53_zone.cfappsecurity.id
  name = "travelr-backend.cfappsecurity.com"
  type = "A"
  ttl = "300"
  records = [aws_instance.backend_server.public_ip]
}
