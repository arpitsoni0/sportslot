#!/bin/bash
# Run this ON the EC2 instance after SSH-ing in.
# It installs Docker and Docker Compose on Amazon Linux 2023 / Ubuntu.

set -e

echo "=== Installing Docker on EC2 ==="

# Detect OS
if [ -f /etc/amazon-linux-release ]; then
  sudo dnf update -y
  sudo dnf install -y docker git
  sudo systemctl start docker
  sudo systemctl enable docker
  sudo usermod -aG docker ec2-user

  # Install Docker Compose plugin
  sudo mkdir -p /usr/local/lib/docker/cli-plugins
  sudo curl -SL "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-$(uname -m)" \
    -o /usr/local/lib/docker/cli-plugins/docker-compose
  sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

elif [ -f /etc/lsb-release ]; then
  sudo apt-get update
  sudo apt-get install -y docker.io docker-compose-v2 git
  sudo systemctl start docker
  sudo systemctl enable docker
  sudo usermod -aG docker ubuntu
fi

echo ""
echo "=== Docker installed! ==="
echo "Log out and back in for docker group to take effect, then:"
echo ""
echo "  git clone <your-repo-url> sportslot"
echo "  cd sportslot"
echo "  ./deploy.sh"
