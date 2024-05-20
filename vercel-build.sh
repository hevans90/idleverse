# Install Go
export PATH="$HOME/go/bin:$PATH"
if ! command -v go &> /dev/null; then
    echo "Go not found, installing..."
    # Get the latest version of Go from the official website
    GO_LATEST_VERSION=$(curl -sSL https://golang.org/VERSION?m=text)
    GO_LATEST_URL="https://golang.org/dl/$GO_LATEST_VERSION.linux-amd64.tar.gz"
    # Download and extract the latest version of Go
    curl -sSL $GO_LATEST_URL | tar -C $HOME -xz
fi