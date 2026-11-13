# Database Access and Permission Matrix

| Operation | Student owner | Verified authorized instructor | Unverified/unauthed |
|---|---:|---:|---:|
| Read own portfolio | Allow | N/A | Deny |
| Edit/delete own reflection | Allow | Deny | Deny |
| Upload/delete own artifact | Allow | Deny | Deny |
| Read authorized portfolio | N/A | Allow | Deny |
| Read unauthorized portfolio | Deny | Deny | Deny |
| Grant/revoke instructor access | Allow, own portfolio | Deny | Deny |
| Create review | Deny | Allow, active grant | Deny |
| Create general feedback | Deny | Allow, active grant | Deny |
| Create reflection/artifact feedback | Deny | Allow, active grant | Deny |
| Read own feedback | Allow | Author's records as approved | Deny |
| Modify original student content | Owner only | Deny | Deny |
| Assign instructor role | Deny | Deny | Deny |
| Read audit records | Restricted/approved only | Restricted/approved only | Deny |

Frontend visibility is not an enforcement mechanism. RLS, Storage policies, and trusted provisioning must enforce every boundary.
