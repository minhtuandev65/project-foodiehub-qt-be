# File Tree: project-foodiehub-qt-be

**Generated:** 10/20/2025, 6:03:32 PM
**Root Path:** `d:\project-foodiehub-qt\project-foodiehub-qt-be`

```
├── 📁 src
│   ├── 📁 Images
│   │   └── 🖼️ main-logo.png
│   ├── 📁 config
│   │   ├── 📁 aws
│   │   │   └── 📄 awsS3.js
│   │   ├── 📁 cors
│   │   │   └── 📄 cors.js
│   │   ├── 📁 locales
│   │   │   └── 📄 i18n.js
│   │   ├── 📁 mongo
│   │   │   └── 📄 mongodb.js
│   │   └── 📄 index.js
│   ├── 📁 controllers
│   │   ├── 📁 admin
│   │   │   ├── 📁 assignRoleToUser
│   │   │   │   └── 📄 assign.role.to.user.controller.js
│   │   │   └── 📄 index.js
│   │   ├── 📁 auth
│   │   │   ├── 📁 authenticate
│   │   │   │   └── 📄 authenticate.controller.js
│   │   │   ├── 📁 createNewAccount
│   │   │   │   └── 📄 create.new.account.controller.js
│   │   │   ├── 📁 forgotPassword
│   │   │   │   └── 📄 forgot.password.controller.js
│   │   │   ├── 📁 logout
│   │   │   │   └── 📄 logout.controller.js
│   │   │   ├── 📁 refreshToken
│   │   │   │   └── 📄 refresh.token.controller.js
│   │   │   ├── 📁 resetNewPassword
│   │   │   │   └── 📄 reset.new.password.controller.js
│   │   │   ├── 📁 verifyAccount
│   │   │   │   └── 📄 verify.account.controller.js
│   │   │   └── 📄 index.js
│   │   ├── 📁 menu
│   │   │   ├── 📁 manager
│   │   │   │   ├── 📁 create
│   │   │   │   │   ├── 📁 menu
│   │   │   │   │   │   └── 📄 create.new.menu.controller.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 data
│   │   │   │   │   ├── 📁 list
│   │   │   │   │   │   └── 📄 list.menu.manager.controller.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 delete
│   │   │   │   │   ├── 📁 menu
│   │   │   │   │   │   └── 📄 delete.menu.for.restaurant.controller.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 update
│   │   │   │   │   ├── 📁 menu
│   │   │   │   │   │   └── 📄 update.menu.controller.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 upload
│   │   │   │   │   ├── 📁 menu
│   │   │   │   │   │   └── 📄 upload.image.menu.presign.batch.controller.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   └── 📄 index.js
│   │   │   └── 📄 index.js
│   │   ├── 📁 restaurant
│   │   │   ├── 📁 admin
│   │   │   │   ├── 📁 action
│   │   │   │   │   ├── 📁 accept
│   │   │   │   │   │   └── 📄 accept.restaurant.controller.js
│   │   │   │   │   ├── 📁 reject
│   │   │   │   │   │   └── 📄 reject.restaurant.controller.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 data
│   │   │   │   │   ├── 📁 detail
│   │   │   │   │   ├── 📁 list
│   │   │   │   │   │   └── 📄 list.restaurant.admin.controller.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 manager
│   │   │   │   ├── 📁 create
│   │   │   │   │   ├── 📁 restaurant
│   │   │   │   │   │   └── 📄 create.new.restaurant.controller.js
│   │   │   │   │   ├── 📁 staff
│   │   │   │   │   │   └── 📄 create.new.staff.for.restaurant.controller.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 data
│   │   │   │   │   ├── 📁 detail
│   │   │   │   │   │   └── 📄 detail.restaurant.manager.controller.js
│   │   │   │   │   ├── 📁 list
│   │   │   │   │   │   └── 📄 list.restaurant.manager.controller.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 delete
│   │   │   │   │   ├── 📁 staff
│   │   │   │   │   │   └── 📄 delete.staff.for.restaurant.controller.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 update
│   │   │   │   │   ├── 📁 restaurant
│   │   │   │   │   │   └── 📄 update.restaurant.controller.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 staff
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 user
│   │   │   │   └── 📄 index.js
│   │   │   └── 📄 index.js
│   │   ├── 📁 user
│   │   │   ├── 📁 action
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 admin
│   │   │   │   ├── 📁 action
│   │   │   │   │   ├── 📁 activate
│   │   │   │   │   │   └── 📄 activate.user.controller.js
│   │   │   │   │   ├── 📁 lock
│   │   │   │   │   │   └── 📄 lock.user.controller.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 data
│   │   │   │   │   ├── 📁 detail
│   │   │   │   │   │   └── 📄 detail.user.admin.controller.js
│   │   │   │   │   ├── 📁 list
│   │   │   │   │   │   └── 📄 list.user.admin.controller.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 data
│   │   │   │   ├── 📁 profile
│   │   │   │   │   └── 📄 get.my.profile.controller.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 update
│   │   │   │   ├── 📁 changePassword
│   │   │   │   │   └── 📄 change.new.password.controller.js
│   │   │   │   ├── 📁 profile
│   │   │   │   │   └── 📄 update.profile.user.controller.js
│   │   │   │   └── 📄 index.js
│   │   │   └── 📄 index.js
│   │   └── 📄 index.js
│   ├── 📁 helpers
│   │   ├── 📁 mongo
│   │   │   ├── 📁 collectionName
│   │   │   │   ├── 📁 menu
│   │   │   │   │   └── 📄 menu.collection.name.js
│   │   │   │   ├── 📁 restaurant
│   │   │   │   │   └── 📄 restaurants.collection.name.js
│   │   │   │   ├── 📁 staff
│   │   │   │   │   └── 📄 staff.collection.name.js
│   │   │   │   ├── 📁 user
│   │   │   │   │   └── 📄 user.collection.name.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 fields
│   │   │   │   ├── 📁 invalidUpdateFieldMenu
│   │   │   │   │   └── 📄 invalidUpdateFieldMenu.js
│   │   │   │   ├── 📁 invalidUpdateFieldMyProfile
│   │   │   │   │   └── 📄 invalidUpdateFieldMyProfile.js
│   │   │   │   ├── 📁 invalidUpdateFieldRestaurant
│   │   │   │   │   └── 📄 invalidUpdateFieldRestaurant.js
│   │   │   │   ├── 📁 invalidUpdateFieldsAdmin
│   │   │   │   │   └── 📄 invalidUpdateFieldsAdmin.js
│   │   │   │   ├── 📁 invalidUpdateFieldsManager
│   │   │   │   │   └── 📄 invalidUpdateFieldsManager.js
│   │   │   │   ├── 📁 invalidUpdateFieldsStaff
│   │   │   │   │   └── 📄 invalidUpdateFieldsStaff.js
│   │   │   │   ├── 📁 invalidUpdateFieldsUser
│   │   │   │   │   └── 📄 invalidUpdateFieldsUser.js
│   │   │   │   └── 📄 index.js
│   │   │   └── 📄 index.js
│   │   └── 📄 index.js
│   ├── 📁 locales
│   │   ├── ⚙️ en.json
│   │   └── ⚙️ vi.json
│   ├── 📁 middlewares
│   │   ├── 📁 auth
│   │   │   └── 📄 authMiddleware.js
│   │   ├── 📁 aws
│   │   │   ├── 📁 upload
│   │   │   │   ├── 📁 multiple
│   │   │   │   │   └── 📄 uploadMultiple.js
│   │   │   │   ├── 📁 useUploadFiles
│   │   │   │   │   ├── 📄 uploadAvatar.js
│   │   │   │   │   ├── 📄 uploadImageMenu.js
│   │   │   │   │   └── 📄 uploadRestaurantFiles.js
│   │   │   │   └── 📄 index.js
│   │   │   └── 📄 index.js
│   │   ├── 📁 errorHandlingMiddleware
│   │   │   └── 📄 errorHandlingMiddleware.js
│   │   └── 📄 index.js
│   ├── 📁 models
│   │   ├── 📁 auth
│   │   │   ├── 📁 create
│   │   │   │   ├── 📁 createNewAccount
│   │   │   │   │   └── 📄 create.new.account.model.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 find
│   │   │   │   ├── 📁 email
│   │   │   │   │   └── 📄 find.by.email.model.js
│   │   │   │   ├── 📁 id
│   │   │   │   │   └── 📄 find.by.id.model.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 model
│   │   │   │   └── 📄 auth.model.js
│   │   │   ├── 📁 update
│   │   │   │   ├── 📁 updateLatestActive
│   │   │   │   │   └── 📄 update.latest.active.model.js
│   │   │   │   ├── 📁 updateNewPassword
│   │   │   │   │   └── 📄 update.new.password.model.js
│   │   │   │   ├── 📁 updateNewRole
│   │   │   │   │   └── 📄 update.new.role.model.js
│   │   │   │   ├── 📁 updateProfileUser
│   │   │   │   │   └── 📄 update.profile.user.model.js
│   │   │   │   └── 📄 index.js
│   │   │   └── 📄 index.js
│   │   ├── 📁 menu
│   │   │   ├── 📁 find
│   │   │   │   ├── 📁 id
│   │   │   │   │   └── 📄 find.by.id.model.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 manager
│   │   │   │   ├── 📁 create
│   │   │   │   │   ├── 📁 menu
│   │   │   │   │   │   └── 📄 create.new.menu.model.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 data
│   │   │   │   │   ├── 📁 detail
│   │   │   │   │   │   └── 📄 detail.menu.manager.model.js
│   │   │   │   │   ├── 📁 list
│   │   │   │   │   │   └── 📄 list.menu.manager.model.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 delete
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 update
│   │   │   │   │   ├── 📁 menu
│   │   │   │   │   │   └── 📄 update.menu.moel.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 model
│   │   │   │   └── 📄 menu.model.js
│   │   │   └── 📄 index.js
│   │   ├── 📁 restaurant
│   │   │   ├── 📁 admin
│   │   │   │   ├── 📁 data
│   │   │   │   │   ├── 📁 list
│   │   │   │   │   │   └── 📄 list.restaurant.admin.model.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 find
│   │   │   │   ├── 📁 id
│   │   │   │   │   └── 📄 find.by.id.model.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 manager
│   │   │   │   ├── 📁 create
│   │   │   │   │   ├── 📁 restaurant
│   │   │   │   │   │   └── 📄 create.new.restaurant.manager.model.js
│   │   │   │   │   ├── 📁 staff
│   │   │   │   │   │   └── 📄 create.new.staff.for.restaurant.model.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 data
│   │   │   │   │   ├── 📁 detail
│   │   │   │   │   │   └── 📄 detail.restaurant.manager.model.js
│   │   │   │   │   ├── 📁 list
│   │   │   │   │   │   └── 📄 list.restaurant.manager.model.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 delete
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 update
│   │   │   │   │   ├── 📁 restaurant
│   │   │   │   │   │   └── 📄 update.restaurant.manager.model.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 model
│   │   │   │   └── 📄 restaurant.model.js
│   │   │   └── 📄 index.js
│   │   ├── 📁 staff
│   │   │   ├── 📁 find
│   │   │   │   ├── 📁 email
│   │   │   │   │   └── 📄 find.by.email.model.js
│   │   │   │   ├── 📁 id
│   │   │   │   │   └── 📄 find.by.id.model.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 manager
│   │   │   │   ├── 📁 create
│   │   │   │   │   ├── 📁 staff
│   │   │   │   │   │   └── 📄 create.new.staff.model.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 data
│   │   │   │   │   ├── 📁 detail
│   │   │   │   │   │   └── 📄 detail.staff.manager.model.js
│   │   │   │   │   ├── 📁 list
│   │   │   │   │   │   └── 📄 list.staff.manager.model.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 delete
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 update
│   │   │   │   │   ├── 📁 staff
│   │   │   │   │   │   └── 📄 update.staff.model.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 model
│   │   │   │   └── 📄 staff.model.js
│   │   │   └── 📄 index.js
│   │   ├── 📁 user
│   │   │   ├── 📁 admin
│   │   │   │   ├── 📁 data
│   │   │   │   │   ├── 📁 detail
│   │   │   │   │   │   └── 📄 detail.user.admin.model.js
│   │   │   │   │   ├── 📁 list
│   │   │   │   │   │   └── 📄 list.user.admin.model.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 data
│   │   │   │   ├── 📁 existUserPassword
│   │   │   │   │   └── 📄 exist.user.password.js
│   │   │   │   ├── 📁 getMyProfile
│   │   │   │   │   └── 📄 get.my.profile.model.js
│   │   │   │   └── 📄 index.js
│   │   │   └── 📄 index.js
│   │   └── 📄 index.js
│   ├── 📁 providers
│   │   ├── 📁 cloudStorageProvider
│   │   │   ├── 📁 getUrlS3
│   │   │   │   └── 📄 getUrlS3.js
│   │   │   ├── 📁 uploadFileToS3
│   │   │   │   └── 📄 uploadFileS3.js
│   │   │   ├── 📁 uploadImageToS3
│   │   │   │   └── 📄 uploadImageToS3.js
│   │   │   └── 📄 index.js
│   │   ├── 📄 JwtProvider.js
│   │   ├── 📄 ResendProvider.js
│   │   └── 📄 geocodeAddress.js
│   ├── 📁 routes
│   │   ├── 📁 v1
│   │   │   ├── 📁 admin
│   │   │   │   └── 📄 admin.routes.js
│   │   │   ├── 📁 auth
│   │   │   │   └── 📄 auth.routes.js
│   │   │   ├── 📁 menu
│   │   │   │   ├── 📁 restaurant
│   │   │   │   │   └── 📄 restaurant.menu.routes.js
│   │   │   │   └── 📄 menu.routes.js
│   │   │   ├── 📁 restaurant
│   │   │   │   ├── 📁 admin
│   │   │   │   │   └── 📄 admin.restaurant.routes.js
│   │   │   │   ├── 📁 manager
│   │   │   │   │   └── 📄 manager.restauarnt.routes.js
│   │   │   │   ├── 📁 staff
│   │   │   │   │   └── 📄 staff.restaurant.routes.js
│   │   │   │   ├── 📁 user
│   │   │   │   │   └── 📄 user.restaurant.routes.js
│   │   │   │   └── 📄 restaurant.routes.js
│   │   │   ├── 📁 user
│   │   │   │   ├── 📁 admin
│   │   │   │   │   └── 📄 admin.user.routes.js
│   │   │   │   └── 📄 user.routes.js
│   │   │   └── 📄 index.js
│   │   └── 📁 v2
│   │       └── 📄 index.js
│   ├── 📁 services
│   │   ├── 📁 admin
│   │   │   ├── 📁 action
│   │   │   │   ├── 📁 assignRoleToUser
│   │   │   │   │   └── 📄 assign.role.to.user.service.js
│   │   │   │   └── 📄 index.js
│   │   │   └── 📄 index.js
│   │   ├── 📁 auth
│   │   │   ├── 📁 authenticate
│   │   │   │   └── 📄 authenticate.service.js
│   │   │   ├── 📁 createNewAccount
│   │   │   │   └── 📄 create.new.account.service.js
│   │   │   ├── 📁 forgotPassword
│   │   │   │   └── 📄 forgot.password.service.js
│   │   │   ├── 📁 refreshToken
│   │   │   │   └── 📄 refresh.token.service.js
│   │   │   ├── 📁 resetNewPassword
│   │   │   │   └── 📄 reset.new.password.service.js
│   │   │   ├── 📁 verifyAccount
│   │   │   │   └── 📄 verify.account.service.js
│   │   │   └── 📄 index.js
│   │   ├── 📁 menu
│   │   │   ├── 📁 manager
│   │   │   │   ├── 📁 create
│   │   │   │   │   ├── 📁 menu
│   │   │   │   │   │   └── 📄 create.new.menu.service.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 data
│   │   │   │   │   ├── 📁 list
│   │   │   │   │   │   └── 📄 list.menu.manager.service.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 delete
│   │   │   │   │   ├── 📁 menu
│   │   │   │   │   │   └── 📄 delete.menu.service.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 update
│   │   │   │   │   ├── 📁 menu
│   │   │   │   │   │   └── 📄 update.menu.service.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   └── 📄 index.js
│   │   │   └── 📄 index.js
│   │   ├── 📁 restaurant
│   │   │   ├── 📁 admin
│   │   │   │   ├── 📁 action
│   │   │   │   │   ├── 📁 accept
│   │   │   │   │   │   └── 📄 accept.restaurant.service.js
│   │   │   │   │   ├── 📁 reject
│   │   │   │   │   │   └── 📄 reject.restaurant.service.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 data
│   │   │   │   │   ├── 📁 list
│   │   │   │   │   │   └── 📄 list.restaurant.admin.service.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 manager
│   │   │   │   ├── 📁 create
│   │   │   │   │   ├── 📁 restaurant
│   │   │   │   │   │   └── 📄 create.new.restaurant.manager.service.js
│   │   │   │   │   ├── 📁 staff
│   │   │   │   │   │   └── 📄 create.new.staff.for.restaurant.manager.service.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 data
│   │   │   │   │   ├── 📁 detail
│   │   │   │   │   │   └── 📄 detail.restaurant.manager.service.js
│   │   │   │   │   ├── 📁 list
│   │   │   │   │   │   └── 📄 list.restaurant.manager.service.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 delete
│   │   │   │   │   ├── 📁 staff
│   │   │   │   │   │   └── 📄 delete.staff.for.restaurant.service.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 update
│   │   │   │   │   ├── 📁 restaurant
│   │   │   │   │   │   └── 📄 update.restaurant.service.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 staff
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 user
│   │   │   │   └── 📄 index.js
│   │   │   └── 📄 index.js
│   │   ├── 📁 user
│   │   │   ├── 📁 action
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 admin
│   │   │   │   ├── 📁 action
│   │   │   │   │   ├── 📁 activate
│   │   │   │   │   │   └── 📄 activate.user.service.js
│   │   │   │   │   ├── 📁 lock
│   │   │   │   │   │   └── 📄 lock.user.service.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   ├── 📁 data
│   │   │   │   │   ├── 📁 detail
│   │   │   │   │   │   └── 📄 detail.user.admin.service.js
│   │   │   │   │   ├── 📁 list
│   │   │   │   │   │   └── 📄 list.user.admin.service.js
│   │   │   │   │   └── 📄 index.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 data
│   │   │   │   ├── 📁 profile
│   │   │   │   │   └── 📄 get.my.profile.service.js
│   │   │   │   └── 📄 index.js
│   │   │   ├── 📁 update
│   │   │   │   ├── 📁 changePassword
│   │   │   │   │   └── 📄 change.new.password.service.js
│   │   │   │   ├── 📁 profile
│   │   │   │   │   └── 📄 update.profile.user.service.js
│   │   │   │   └── 📄 index.js
│   │   │   └── 📄 index.js
│   │   └── 📄 index.js
│   ├── 📁 sockets
│   │   └── 📄 exampleSocket.js
│   ├── 📁 template
│   │   ├── 📁 auth
│   │   │   ├── 📁 forgotPasswordMailTemplate
│   │   │   │   └── 📄 forgot.password.mail.template.js
│   │   │   ├── 📁 resetPasswordSuccessTemplate
│   │   │   │   └── 📄 reset.password.success.template.js
│   │   │   ├── 📁 verifyEmailTemplate
│   │   │   │   └── 📄 verify.email.template.js
│   │   │   └── 📄 index.js
│   │   ├── 📁 clients
│   │   │   ├── 📁 assignRoleToUserTemplate
│   │   │   │   └── 📄 assign.role.to.user.template.js
│   │   │   └── 📄 index.js
│   │   ├── 📁 restaurant
│   │   │   ├── 📁 restaurantAddStaffForManagerTemplate
│   │   │   │   └── 📄 restaurant.add.staff.for.manager.template.js
│   │   │   ├── 📁 restaurantCreateNewTemplate
│   │   │   │   └── 📄 restaurant.create.new.template.js
│   │   │   ├── 📁 restaurantUpdateTemplate
│   │   │   │   └── 📄 restaurant.update.template.js
│   │   │   ├── 📄 index.js
│   │   │   └── 🌐 test.html
│   │   └── 📄 index.js
│   ├── 📁 utils
│   │   ├── 📄 ApiError.js
│   │   ├── 📄 algorithms.js
│   │   ├── 📄 checkIsOpenRestaurant.js
│   │   ├── 📄 constants.js
│   │   ├── 📄 sanitize.js
│   │   └── 📄 sorts.js
│   ├── 📁 validations
│   │   ├── 📁 beforeCreate
│   │   │   ├── 📁 auth
│   │   │   │   └── 📄 validate.auth.js
│   │   │   ├── 📁 menu
│   │   │   │   └── 📄 validate.menu.js
│   │   │   ├── 📁 restaurant
│   │   │   │   └── 📄 validate.restaurant.js
│   │   │   ├── 📁 staff
│   │   │   │   └── 📄 validate.staff.js
│   │   │   └── 📄 index.js
│   │   ├── 📄 index.js
│   │   └── 📄 validators.js
│   └── 📄 server.js
├── ⚙️ .eslintrc.cjs
├── ⚙️ .gitignore
├── ⚙️ .prettierrc
├── 📄 Procfile
├── 📝 README.md
├── ⚙️ jsconfig.json
├── ⚙️ package-lock.json
└── ⚙️ package.json
```

---
*Generated by FileTree Pro Extension*