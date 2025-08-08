        // Data structures for extensions and search engines
        let extensionsToInstall = [
            "https://addons.mozilla.org/firefox/downloads/latest/ublock-origin/latest.xpi",
            "https://addons.mozilla.org/firefox/downloads/latest/bitwarden-password-manager/latest.xpi",
            "https://addons.mozilla.org/firefox/downloads/latest/multi-account-containers/latest.xpi"
        ];

        let searchEngines = [
            { name: "G", url: "https://www.google.com/search?q={searchTerms}", alias: "!g" },
            { name: "Brave", url: "https://search.brave.com/search?q={searchTerms}", alias: "!b" },
            { name: "Startpage", url: "https://www.startpage.com/do/search?q={searchTerms}", alias: "" },
            { name: "DuckDuckGo", url: "https://duckduckgo.com/?q={searchTerms}", alias: "!ddg" },
            { name: "YouTube", url: "https://www.youtube.com/results?search_query={searchTerms}", alias: "!yt" }
        ];

        let currentPolicy = {};

        // Initialize the tool
        function init() {
            updateExtensionList();
            updateSearchEngineList();
            generatePolicy();
            showSuccessMessage();
            
            // Add event listeners for real-time updates
            document.querySelectorAll('input, select').forEach(element => {
                element.addEventListener('change', () => {
                    generatePolicy();
                    showSuccessMessage();
                });
                element.addEventListener('input', () => {
                    generatePolicy();
                    showSuccessMessage();
                });
            });
        }

        // Generate the policy JSON
        function generatePolicy() {
            const policy = {
                "__COMMENT__ More Information": "https://github.com/mozilla/policy-templates/blob/master/README.md",
                "__COMMENT__ Generated": `Firefox Policy Generator - ${new Date().toISOString()}`,
                "policies": {}
            };

            // Basic settings
            if (document.getElementById('dontCheckDefaultBrowser').checked) {
                policy.policies.DontCheckDefaultBrowser = true;
            }
            if (document.getElementById('disableFeedbackCommands').checked) {
                policy.policies.DisableFeedbackCommands = true;
            }
            if (document.getElementById('disableFirefoxAccounts').checked) {
                policy.policies.DisableFirefoxAccounts = true;
            }
            if (document.getElementById('disableFirefoxScreenshots').checked) {
                policy.policies.DisableFirefoxScreenshots = true;
            }
            if (document.getElementById('disableFirefoxStudies').checked) {
                policy.policies.DisableFirefoxStudies = true;
            }
            if (document.getElementById('disableTelemetry').checked) {
                policy.policies.DisableTelemetry = true;
            }
            if (document.getElementById('disableAppUpdate').checked) {
                policy.policies.DisableAppUpdate = true;
            }
            if (document.getElementById('disableSystemAddonUpdate').checked) {
                policy.policies.DisableSystemAddonUpdate = true;
            }

            // UI settings
            const bookmarksToolbar = document.getElementById('displayBookmarksToolbar').value;
            if (bookmarksToolbar !== 'always') {
                policy.policies.DisplayBookmarksToolbar = bookmarksToolbar;
            }

            const menuBar = document.getElementById('displayMenuBar').value;
            if (menuBar !== 'default-on') {
                policy.policies.DisplayMenuBar = menuBar;
            }

            if (document.getElementById('disableDeveloperTools').checked) {
                policy.policies.DisableDeveloperTools = true;
            }
            if (document.getElementById('disablePasswordReveal').checked) {
                policy.policies.DisablePasswordReveal = true;
            }
            if (document.getElementById('disablePrivateBrowsing').checked) {
                policy.policies.DisablePrivateBrowsing = true;
            }

            // Homepage settings
            const homepageURL = document.getElementById('homepageURL').value;
            const startPage = document.getElementById('startPage').value;
            const newTabURL = document.getElementById('newTabURL').value;
            
            if (homepageURL || startPage !== 'none') {
                policy.policies.Homepage = {};
                if (homepageURL) policy.policies.Homepage.URL = homepageURL;
                if (startPage !== 'none') policy.policies.Homepage.StartPage = startPage;
                policy.policies.Homepage.Locked = false;
            }

            if (newTabURL) {
                policy.policies.NewTabPage = false;
                policy.policies.OverrideFirstRunPage = newTabURL;
            }

            // Firefox Home settings
            policy.policies.FirefoxHome = {
                Search: document.getElementById('homeSearch').checked,
                TopSites: document.getElementById('homeTopSites').checked,
                SponsoredTopSites: document.getElementById('homeSponsoredTopSites').checked,
                Highlights: document.getElementById('homeHighlights').checked,
                Pocket: document.getElementById('homePocket').checked,
                SponsoredPocket: false,
                Snippets: false,
                Locked: false
            };

            // Privacy settings
            if (document.getElementById('noDefaultBookmarks').checked) {
                policy.policies.NoDefaultBookmarks = true;
            }
            if (!document.getElementById('offerToSaveLogins').checked) {
                policy.policies.OfferToSaveLogins = false;
            }
            if (document.getElementById('disableFormHistory').checked) {
                policy.policies.DisableFormHistory = true;
            }
            if (document.getElementById('disablePasswordManager').checked) {
                policy.policies.PasswordManagerEnabled = false;
            }

            // Enhanced Tracking Protection
            if (document.getElementById('trackingProtection').checked) {
                policy.policies.EnableTrackingProtection = {
                    Value: true,
                    Locked: true,
                    Cryptomining: true,
                    Fingerprinting: true
                };
            }

            // Firefox Suggest
            policy.policies.FirefoxSuggest = {
                WebSuggestions: document.getElementById('webSuggestions').checked,
                SponsoredSuggestions: document.getElementById('sponsoredSuggestions').checked,
                ImproveSuggest: true,
                Locked: false
            };

            // DNS over HTTPS
            const dnsOverHttps = document.getElementById('dnsOverHttps').value;
            if (dnsOverHttps !== 'default') {
                if (dnsOverHttps === 'disabled') {
                    policy.policies.DNSOverHTTPS = {
                        Enabled: false,
                        Locked: true
                    };
                } else {
                    const dnsProviders = {
                        cloudflare: "https://mozilla.cloudflare-dns.com/dns-query",
                        quad9: "https://dns.quad9.net/dns-query"
                    };
                    policy.policies.DNSOverHTTPS = {
                        Enabled: true,
                        ProviderURL: dnsProviders[dnsOverHttps],
                        Locked: true
                    };
                }
            }

            // Extensions
            if (extensionsToInstall.length > 0) {
                policy.policies.Extensions = {
                    Install: extensionsToInstall,
                    Uninstall: [
                        "google@search.mozilla.org",
                        "bing@search.mozilla.org",
                        "amazondotcom@search.mozilla.org",
                        "ebay@search.mozilla.org",
                        "twitter@search.mozilla.org",
                        "wikipedia@search.mozilla.org"
                    ]
                };
            }

            // Extension policies
            if (document.getElementById('blockExtensionInstall').checked) {
                policy.policies.InstallAddonsPermission = {
                    Allow: [],
                    Default: false
                };
            }
            if (!document.getElementById('extensionRecommendations').checked) {
                policy.policies.ExtensionRecommendations = false;
            }

            // Search engines
            if (searchEngines.length > 0) {
                policy.policies.SearchEngines = {
                    Default: document.getElementById('defaultSearchEngine').value,
                    Add: searchEngines.map(engine => ({
                        Name: engine.name,
                        URLTemplate: engine.url,
                        Alias: engine.alias,
                        Method: "GET"
                    })),
                    PreventInstalls: document.getElementById('preventSearchEngineInstalls').checked,
                    Remove: ["Google", "Bing", "Amazon.com", "eBay", "Twitter", "Wikipedia"]
                };
            }

            // Content blocking and network security
            const contentBlocking = document.getElementById('contentBlocking').value;
            if (contentBlocking === 'strict') {
                policy.policies.EnableTrackingProtection = {
                    Value: true,
                    Locked: true,
                    Cryptomining: true,
                    Fingerprinting: true
                };
            }

            // Download protection
            if (document.getElementById('blockDangerousDownloads').checked) {
                policy.policies.DisableBuiltinPDFViewer = false; // Keep PDF viewer for security
            }
            if (document.getElementById('blockUncommonDownloads').checked) {
                policy.policies.DownloadRestrictions = {
                    ApplicationZip: false,
                    Executable: false
                };
            }

            // WebRTC
            if (document.getElementById('disableWebRTC').checked) {
                policy.policies.WebRTCIPHandlingPolicy = "disable_non_proxied_udp";
            }

            // Proxy settings
            const proxyMode = document.getElementById('proxyMode').value;
            if (proxyMode !== 'none') {
                policy.policies.Proxy = {
                    Mode: proxyMode,
                    Locked: true
                };
            }

            // Additional security policies
            policy.policies.OverrideFirstRunPage = "";
            policy.policies.OverridePostUpdatePage = "";
            policy.policies.DisableSetDesktopBackground = true;
            policy.policies.DisableBuiltinPDFViewer = false;
            policy.policies.BlockAboutConfig = false;

            // Store current policy
            currentPolicy = policy;
        }

        // Show success message
        function showSuccessMessage() {
            const message = document.getElementById('successMessage');
            message.classList.add('show');
            setTimeout(() => {
                message.classList.remove('show');
            }, 3000);
        }

        // Add extension
        function addExtension(type) {
            const input = document.getElementById('newExtensionURL');
            const url = input.value.trim();
            if (url) {
                if (type === 'install') {
                    extensionsToInstall.push(url);
                    updateExtensionList();
                }
                input.value = '';
                generatePolicy();
                showSuccessMessage();
            }
        }

        // Remove extension
        function removeExtension(button, type) {
            const item = button.closest('.extension-item');
            const text = item.querySelector('span').textContent;
            
            if (type === 'install') {
                const index = extensionsToInstall.findIndex(url => {
                    return url.includes('ublock-origin') && text.includes('uBlock Origin') ||
                           url.includes('bitwarden') && text.includes('Bitwarden') ||
                           url.includes('multi-account-containers') && text.includes('Multi-Account Containers');
                });
                if (index > -1) {
                    extensionsToInstall.splice(index, 1);
                }
            } else if (type === 'search') {
                const index = searchEngines.findIndex(engine => text.includes(engine.name));
                if (index > -1) {
                    searchEngines.splice(index, 1);
                }
            }
            
            item.remove();
            generatePolicy();
            showSuccessMessage();
        }

        // Update extension list display
        function updateExtensionList() {
            const list = document.getElementById('extensionInstallList');
            list.innerHTML = '';
            
            extensionsToInstall.forEach(url => {
                const item = document.createElement('div');
                item.className = 'extension-item';
                
                let name = 'Custom Extension';
                if (url.includes('ublock-origin')) name = 'uBlock Origin - Ad & Tracker Blocker';
                else if (url.includes('bitwarden')) name = 'Bitwarden - Password Manager';
                else if (url.includes('multi-account-containers')) name = 'Multi-Account Containers - Isolation';
                
                item.innerHTML = `
                    <span>${name}</span>
                    <button class="btn btn-danger" onclick="removeExtension(this, 'install')">Remove</button>
                `;
                list.appendChild(item);
            });
        }

        // Update search engine list display
        function updateSearchEngineList() {
            const list = document.getElementById('searchEngineList');
            list.innerHTML = '';
            
            searchEngines.forEach(engine => {
                const item = document.createElement('div');
                item.className = 'extension-item';
                
                const displayName = `${engine.name}${engine.alias ? ' (' + engine.alias + ')' : ''}`;
                
                item.innerHTML = `
                    <span>${displayName}</span>
                    <button class="btn btn-danger" onclick="removeExtension(this, 'search')">Remove</button>
                `;
                list.appendChild(item);
            });
        }

        // Show OS instructions
        function showOS(os) {
            document.querySelectorAll('.os-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.os-content').forEach(content => content.classList.remove('active'));
            
            event.target.classList.add('active');
            document.getElementById(os).classList.add('active');
        }

        // Copy to clipboard
        function copyToClipboard() {
            const text = JSON.stringify(currentPolicy, null, 2);
            navigator.clipboard.writeText(text).then(() => {
                const button = event.target;
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            });
        }

        // Download policy as JSON file
        function downloadPolicy() {
            const policyText = JSON.stringify(currentPolicy, null, 2);
            const blob = new Blob([policyText], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'policies.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', init);