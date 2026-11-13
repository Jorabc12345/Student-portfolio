# Database Traceability Matrix

| Requirement | Design evidence | Result |
|---|---|---|
| Supabase Auth identity | `user_profiles.auth_user_id` | Supported |
| Private individual portfolio | `portfolios.student_profile_id` | Supported |
| Student-only content management | Ownership paths and RLS requirements | Requires implementation |
| Verified instructor role | `instructor_profiles.verification_status`, trusted roles | Supported; provisioning required |
| Controlled instructor registration | `instructor_invitation_codes`, atomic redemption, trusted role insert | Supported; client code process pending |
| Explicit student authorization | `portfolio_access_grants` | Supported |
| Revocation | Grant state/timestamps and access events | Supported; policy testing required |
| No automatic assignment | No assignment queue; grants are owner-created | Supported |
| Reviews and feedback | `portfolio_reviews`, `portfolio_feedback` | Supported |
| Feedback cannot alter originals | Separate tables and denied instructor mutations | Requires RLS |
| Three Level 1 subjects | Seed validation requirement | Supported by design |
| Twelve folders | Four-folder-per-subject seed check | Supported by design |
| Eight MED 102 domains | Separate `learning_domains` records | Supported |
| Official reflection requirements | Protected `content_prompts` | Supported |
| Global sections | `global_sections` and content records | Supported |
| Reusable private artifacts | Storage metadata and junctions | Supported |
| Configurable artifact limits/retention | `artifact_policy_settings` plus Storage metadata | Values pending approval |
| Future academic levels | Data-driven hierarchy | Supported |
| Audit/progress | Monitoring tables and bounded events | Rules remain open |
| Backup and restore | Protected export/restore procedure | Owner and schedule pending |
