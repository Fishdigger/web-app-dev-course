package version

import "fmt"

const appVersion = "1.0.0"

func GetVersion() string {
	return fmt.Sprintf("Henry's Book API version %v", appVersion)
}
